import jwt from "jsonwebtoken";

export function signToken(user) {
  const secret = process.env.JWT_SECRET || "dev_only_change_this_secret";

  return jwt.sign(
    { id: user._id.toString(), role: user.role, email: user.email },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}
