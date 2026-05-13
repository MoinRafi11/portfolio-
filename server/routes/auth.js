import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import OtpCode from "../models/OtpCode.js";
import { createOtp, hashOtp } from "../utils/otp.js";
import { sendOtpEmail } from "../utils/mailer.js";
import { signToken } from "../utils/tokens.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ message: "Name, valid email, and 6+ character password are required" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: "user",
    });

    res.status(201).json({
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || "").toLowerCase() });

    if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.role === "admin") {
      const code = createOtp();
      await OtpCode.deleteMany({ user: user._id, used: false });
      await OtpCode.create({
        user: user._id,
        codeHash: hashOtp(code),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });
      await sendOtpEmail(user.email, code);

      return res.json({
        requiresOtp: true,
        userId: user._id,
        message: "OTP sent to admin email",
      });
    }

    res.json({
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { userId, code } = req.body;
    const otp = await OtpCode.findOne({
      user: userId,
      codeHash: hashOtp(String(code || "")),
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otp) return res.status(401).json({ message: "Invalid or expired OTP" });

    const user = await User.findById(userId);
    if (!user || user.role !== "admin") return res.status(403).json({ message: "Admin access required" });

    otp.used = true;
    await otp.save();

    res.json({
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
