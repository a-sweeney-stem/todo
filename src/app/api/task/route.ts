import { db } from "@/database/db";
import { tasks } from "@/database/schema/tasks";

export async function POST(request: Request) {
  const body = await request.json();
  await db.insert(tasks).values(body);

  return new Response("OK");
}
