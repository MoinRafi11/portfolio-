import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Your Name" },
    initials: { type: String, default: "YN" },
    role: { type: String, default: "Full-Stack Developer" },
    headline: { type: String, default: "The Person Behind The Code" },
    bio: [{ type: String }],
    location: { type: String, default: "Jammu & Kashmir, India" },
    experience: { type: String, default: "5+ Years" },
    speciality: { type: String, default: "Full-Stack Development" },
    languages: { type: String, default: "English, Hindi, Urdu" },
    email: { type: String, default: "hello@yourportfolio.dev" },
    timezone: { type: String, default: "IST (UTC+5:30)" },
    responseTime: { type: String, default: "Within 24 hours" },
    github: { type: String, default: "https://github.com" },
    linkedin: { type: String, default: "https://linkedin.com" },
    twitter: { type: String, default: "https://twitter.com" },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
