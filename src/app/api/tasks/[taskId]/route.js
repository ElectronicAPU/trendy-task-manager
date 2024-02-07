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

// @desc    Delete task
// @api     DELETE /api/tasks/[task_id]
// @access  Public
export async function DELETE(req, { params }) {
  const { taskId } = params;

  try {
    const findTask = await Task.findById(taskId);

    if (!findTask) {
      return NextResponse.json(
        { message: "Task not found", success: false },
        { status: 404 }
      );
    } else {
      await Task.deleteOne({ _id: taskId });

      return NextResponse.json(
        { message: "Task deleted", success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}

