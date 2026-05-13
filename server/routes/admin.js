import express from "express";
import ContactMessage from "../models/ContactMessage.js";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Service from "../models/Service.js";
import SkillCategory from "../models/SkillCategory.js";
import TimelineItem from "../models/TimelineItem.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth, requireAdmin);

const resources = {
  projects: Project,
  skills: SkillCategory,
  services: Service,
  timeline: TimelineItem,
  messages: ContactMessage,
};

router.get("/profile", async (_req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

router.put("/profile", async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  res.json(profile);
});

router.get("/:resource", async (req, res) => {
  const Model = resources[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });

  const items = await Model.find().sort({ order: 1, createdAt: -1 });
  res.json(items);
});

router.post("/:resource", async (req, res) => {
  const Model = resources[req.params.resource];
  if (!Model || req.params.resource === "messages") {
    return res.status(404).json({ message: "Unknown resource" });
  }

  const item = await Model.create(req.body);
  res.status(201).json(item);
});

router.put("/:resource/:id", async (req, res) => {
  const Model = resources[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });

  const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

router.delete("/:resource/:id", async (req, res) => {
  const Model = resources[req.params.resource];
  if (!Model) return res.status(404).json({ message: "Unknown resource" });

  const item = await Model.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Deleted" });
});

export default router;
