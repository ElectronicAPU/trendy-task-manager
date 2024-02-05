import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    priority: { type: String, required: true, default: "High" },
    status: { type: String, required: true, default: "Starting soon" },
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Task =
  mongoose.models.tasks || mongoose.model("tasks", taskSchema);
