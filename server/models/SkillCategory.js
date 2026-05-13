import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
  },
  { _id: false }
);

const skillCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    color: { type: String, default: "#4c7cc9" },
    skills: [skillSchema],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("SkillCategory", skillCategorySchema);
