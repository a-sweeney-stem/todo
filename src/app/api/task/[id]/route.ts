import { db } from "@/database/db";
import { tasks } from "@/database/schema/tasks";
import { APIErrorResponse, APIResponse } from "@/helpers/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { validation } from "@/helpers/validation";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<APIResponse | APIErrorResponse> {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const validatedData = validation.safeParse({
      taskName: body.taskName,
      taskDescription: body.taskDescription,
      taskCompleted: body.taskCompleted,
    });
    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: "There is an error with your request data!",
          body: validatedData.error,
        },
        { status: 400 }
      );
    }

    const task = await db
      .update(tasks)
      .set(validatedData.data)
      .where(eq(tasks.id, id))
      .returning();

    return NextResponse.json({
      message: "Task updated successfully",
      tasks: task,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<APIResponse | APIErrorResponse> {
  try {
    const id = parseInt(params.id);
    const task = await db.delete(tasks).where(eq(tasks.id, id)).returning();

    return NextResponse.json({
      message: "Task deleted successfully",
      tasks: task,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
