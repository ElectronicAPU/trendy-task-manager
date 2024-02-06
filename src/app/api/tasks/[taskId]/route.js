import { Task } from "@/models/taskModel";
import { NextResponse } from "next/server";

// @desc    Get a task by ID
// @api     POST /api/tasks/[taskId]
// @access  Public
export async function POST(req) {
  const { taskId } = await req.json();

  try {
    if (!taskId) {
      return NextResponse.json(
        { message: "please provide the task ID", success: false },
        {
          status: 400,
        }
      );
    }

    const task = await Task.findById(taskId);

    return NextResponse.json(
      { data: task, message: "Task found", success: true },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: error.message, success: false },
      {
        status: 500,
      }
    );
  }
}
