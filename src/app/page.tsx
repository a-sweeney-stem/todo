"use client";
import TaskForm from "@/components/TaskForm/TaskForm";
import Task from "@/components/Task/Task";
import Loading from "./Loading";
import { Task as TaskType } from "@/database/schema";
import { useEffect, useState, Dispatch, SetStateAction, Suspense } from "react";
import styles from "./page.module.css";
import { validation } from "@/helpers/validation";
import ShowHideButton from "@/components/ShowHideButton/ShowHideButton";

export interface OnSubmitProps {
  taskName: string;
  taskDescription: string;
  taskCompleted: boolean;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export default function Home() {
  const [showInput, setShowInput] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const updateTasks = async (): Promise<void> => {
    const res = await fetch("/api/tasks");
    const data = await res.json();

    console.log("data", data);
    setTasks(data.tasks);
  };

  const handleInputToggleClick = (): void => {
    setShowInput((oldVal) => !oldVal);
  };

  const onSubmit = async (props: OnSubmitProps): Promise<void> => {
    const validatedData = validation.safeParse({
      taskName: props.taskName,
      taskDescription: props.taskDescription,
      taskCompleted: props.taskCompleted,
    });
    if (!validatedData.success) {
      throw new Error("Validation Error");
    }

    await fetch(`/api/task`, {
      method: "POST",
      body: JSON.stringify(validatedData.data),
    });
    updateTasks();
  };

  useEffect(() => {
    updateTasks();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-100 d-flex justify-content-center">
        <div className={styles.appContainer}>
          <div className="pt-3 pb-3">
            <ShowHideButton handleClick={handleInputToggleClick} show={showInput}/>
          </div>
          {showInput && <TaskForm onSubmit={onSubmit} />}
          {tasks.length > 0 &&
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
          <div className="pt-3 pb-3">
            {tasks.length === 0 && <p>Please Add a Task</p>}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
