import { allTasks } from '@/database/tasks'

export default function Home() { 
  console.log('allTasks', allTasks)

  return (
    <p>Home</p>
  )
}
