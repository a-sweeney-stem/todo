"use client";
import { ChangeEvent, useState } from "react";
import styles from "./Task.module.css";

interface TaskProps {
  taskName: string;
  taskDescription: string;
  taskCompleted: boolean;
  id: number;
  updateTasks: () => void;
}

const Task = (props: TaskProps) => {
  const { updateTasks, id } = props;
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [taskName, setTaskName] = useState(props.taskName);
  const [taskDescription, setTaskDescription] = useState(props.taskDescription);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleOpenTask = () => {
    setIsTaskOpen((oldVal) => !oldVal);
  };

  const handleToggleCheckbox = () => {
    setTaskCompleted((oldVal) => !oldVal);
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(event.target.value);
  };

  const handleDelete = async () => {
    await fetch(`/api/task/${id}`, {
      method: "DELETE",
    });
    updateTasks();
  };

  const handleSave = async () => {
    const newTask = {
      taskName,
      taskDescription,
      taskCompleted,
    };

    await fetch(`/api/task/${props.id}`, {
      method: "PUT",
      body: JSON.stringify(newTask),
    });
  };

  return (
    <div
      className={`${styles.taskContainer} container p-3 bg-info`}
      data-testID={`task-${id}`}
    >
      <div className="row-1 d-flex flex-row justify-content-between">
        <button
          onClick={handleOpenTask}
          className={isTaskOpen ? "bi-dash" : "bi-plus"}
          data-testID={`open-toggle-${id}`}
        ></button>

        <div className="row-1">
          <input
            type="text"
            className="form-control"
            id="taskNameInput"
            data-testID={`task-name-input-${id}`}
            placeholder="Enter Task Name"
            value={taskName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button className="bi-floppy" onClick={handleSave} />
          <button
            className="bi-trash"
            onClick={handleDelete}
            data-testID={`delete-button-${id}`}
          />
        </div>
      </div>

      {isTaskOpen && (
        <div className="row-1">
          <div className="row-1 mt-4 mb-2">
            <textarea
              className="form-control"
              rows={3}
              placeholder="Enter Task Description"
              value={taskDescription}
              onChange={handleTextAreaChange}
              data-testID={`task-description-${id}`}
            />
          </div>

          <div className="row-1 form-check mb-2">
            <input
              className="form-check-input d-inline"
              type="checkbox"
              id="taskCompletedCheckbox"
              checked={taskCompleted}
              onChange={handleToggleCheckbox}
              data-testID={`completed-toggle-${id}`}
            />
            <label
              className="form-check-label d-inline"
              htmlFor="taskCompletedCheckbox"
            >
              Task Completed
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
