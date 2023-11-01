"use client";
import TaskInput from "@/components/TaskInput/TaskInput";
import Task from "@/components/Task/Task";
import { Task as TaskType } from "@/database/schema";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>();

  const updateTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();

    console.log("data", data);
    setTasks(data.tasks);
  };

  useEffect(() => {
    updateTasks();
  }, []);

  return (
    <>
      <TaskInput updateTasks={updateTasks} />
      {tasks &&
        tasks.map((task: TaskType) => {
          return (
            <Task
              id={task.id}
              taskName={task.taskName}
              taskDescription={task.taskDescription}
              taskCompleted={task.taskCompleted}
              updateTasks={updateTasks}
            />
          );
        })}
    </>
  );
}
