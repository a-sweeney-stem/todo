import { db } from '../database/db';
import { tasks } from '../database/schema/tasks';

export default function Home() { 
  const allTasks = db.select().from(tasks).all();
  console.log('allTasks', allTasks)

  return (
    <p>Home</p>
  )
}