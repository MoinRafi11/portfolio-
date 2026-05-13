import express from "express";
import ContactMessage from "../models/ContactMessage.js";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Service from "../models/Service.js";
import SkillCategory from "../models/SkillCategory.js";
import TimelineItem from "../models/TimelineItem.js";

const router = express.Router();

router.get("/portfolio", async (_req, res) => {
  const [profile, projects, skillCategories, services, timeline] = await Promise.all([
    Profile.findOne().lean(),
    Project.find().sort({ order: 1, createdAt: 1 }).lean(),
    SkillCategory.find().sort({ order: 1, createdAt: 1 }).lean(),
    Service.find().sort({ order: 1, createdAt: 1 }).lean(),
    TimelineItem.find().sort({ order: 1, createdAt: 1 }).lean(),
  ]);

  res.json({ profile, projects, skillCategories, services, timeline });
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    await ContactMessage.create({ name, email, subject, budget, message });
    res.status(201).json({ message: "Message saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
