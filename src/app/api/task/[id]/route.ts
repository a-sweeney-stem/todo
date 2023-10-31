import { db } from "@/database/db";
import { tasks } from "@/database/schema/tasks";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  await db.delete(tasks).where(eq(tasks.id, id));

  return new Response("OK");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await request.json();

  await db.update(tasks).set(body).where(eq(tasks.id, id)).returning();

  return new Response("OK");
}
