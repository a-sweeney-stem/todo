import { db } from "../src/database/db";
import { tasks } from "../src/database/schema/tasks";

(async () => {
  await db.delete(tasks);
})();
