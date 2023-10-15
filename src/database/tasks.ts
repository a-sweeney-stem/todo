import { db } from './db';
import { tasks } from './schema';

export const allTasks = db.select().from(tasks).all();