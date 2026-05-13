import mongoose from "mongoose";

const timelineItemSchema = new mongoose.Schema(
  {
    year: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("TimelineItem", timelineItemSchema);
