import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    num: { type: String, required: true, trim: true },
    tag: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    tech: [{ type: String, trim: true }],
    color: { type: String, default: "#c9a84c" },
    link: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
