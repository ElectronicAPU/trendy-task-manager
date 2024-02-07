import { Task } from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { taskId } = params;
    const formData = await req.json();

    if (!formData || !taskId) {
      return NextResponse.json(
        { message: "Please provide valid task details and task ID", success: false },
        { status: 404 }
      );
    }

    const findTask = await Task.findByIdAndUpdate(taskId, formData, {
      new: true,
      runValidators: true,
    });

    if (!findTask) {
      return NextResponse.json(
        { message: "Task not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: findTask,
      message: "Task updated",
      success: true,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the task", success: false },
      { status: 500 }
    );
  }
}
