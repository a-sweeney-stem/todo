import { db } from "@/database/db";
import { tasks } from "@/database/schema/tasks";
import { APIErrorResponse, APIResponse } from "@/helpers/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<APIResponse | APIErrorResponse> {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const task = await db
      .update(tasks)
      .set(body)
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
