import { NextResponse } from "next/server";
import { db } from "@/database/db";
import { tasks } from "@/database/schema/tasks";
import { APIErrorResponse, APIResponse } from "@/helpers/types";

export async function POST(
  request: Request
): Promise<APIResponse | APIErrorResponse> {
  try {
    const body = await request.json();
    const task = await db.insert(tasks).values(body).returning();

    return NextResponse.json({
      message: "Task created successfully",
      tasks: task,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
