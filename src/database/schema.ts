import { 
    sqliteTable,  
    integer,
    text
} from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('task', {
    id: integer('id').primaryKey(),
    taskName: text('task_name'),
    taskDescription: text('task_description'),
    taskCompleted: integer('task_completed', { mode: 'boolean' }),
    createdAt: integer('created_at', { mode: 'timestamp' })
});