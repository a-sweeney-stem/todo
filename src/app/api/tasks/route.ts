import { db } from "@/database/db";
import { tasks } from "@/database/schema/tasks";
import { APIErrorResponse, APIResponse } from "@/helpers/types";
import { NextResponse } from "next/server";

export async function GET(): Promise<APIResponse | APIErrorResponse> {
  try {
    const allTasks = db.select().from(tasks).all();

    return NextResponse.json({
      message: "Tasks fetched successfully",
      tasks: allTasks,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
