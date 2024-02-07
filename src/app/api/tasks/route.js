import { Task } from "@/models/taskModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// @desc    Get tasks
// @api     GET /api/tasks
// @access  Public
export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Token not found Get tasks");
  }
  
  const user = jwt.verify(token, process.env.JWT_SECRET);

  if (!user || !user._id) {
    throw new Error("Invalid or missing user ID in the token");
  }

  const allTasks = await Task.find({ user: user._id });

  return NextResponse.json(allTasks);
}

// @desc    Create a task
// @api     POST /api/tasks
// @access  Public
export async function POST(req) {
  try {
    const { title, priority, status, startdate, enddate, description } =
      await req.json();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      throw new Error("Token not found Create a task");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user || !user._id) {
      throw new Error("Invalid or missing user ID in the token");
    }

    const tasks = new Task({
      user: user._id,
      title,
      priority,
      status,
      startdate,
      enddate,
      description,
    });

    const savedTasks = await tasks.save();

    return NextResponse.json({
      message: "Task saved successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error adding task:", error.message);
    return NextResponse.error("Failed to add task", 500);
  }
}

