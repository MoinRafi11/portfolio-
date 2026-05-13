import bcrypt from "bcryptjs";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import SkillCategory from "../models/SkillCategory.js";
import Service from "../models/Service.js";
import TimelineItem from "../models/TimelineItem.js";
import User from "../models/User.js";
import {
  defaultProfile,
  defaultProjects,
  defaultServices,
  defaultSkills,
  defaultTimeline,
} from "./defaultContent.js";

export async function seedInitialData() {
  if ((await Profile.countDocuments()) === 0) await Profile.create(defaultProfile);
  if ((await Project.countDocuments()) === 0) await Project.insertMany(defaultProjects);
  if ((await SkillCategory.countDocuments()) === 0) await SkillCategory.insertMany(defaultSkills);
  if ((await Service.countDocuments()) === 0) await Service.insertMany(defaultServices);
  if ((await TimelineItem.countDocuments()) === 0) await TimelineItem.insertMany(defaultTimeline);

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL.toLowerCase() });
    if (!existingAdmin) {
      await User.create({
        name: process.env.ADMIN_NAME || "Portfolio Admin",
        email: process.env.ADMIN_EMAIL,
        passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12),
        role: "admin",
      });
      console.log("Admin user created from .env");
    }
  }
}
