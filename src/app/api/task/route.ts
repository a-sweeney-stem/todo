import { NextResponse } from "next/server";
import { db } from "@/database/db";
import { tasks } from "@/database/schema/tasks";

export async function POST(request: Request) {
  const body = await request.json();
  const task = await db.insert(tasks).values(body).returning();

  return NextResponse.json({
    message: "Task created successfully",
    task: task,
  });
}
