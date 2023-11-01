import { db } from "@/database/db";
import { tasks } from "@/database/schema/tasks";

export async function GET() {
  const allTasks = db.select().from(tasks).all();

  return Response.json({ tasks: allTasks });
}
