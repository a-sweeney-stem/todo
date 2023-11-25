import { z } from "zod";

export const validation = z.object({
  taskName: z.string(),
  taskDescription: z.string(),
  taskCompleted: z.boolean(),
});
