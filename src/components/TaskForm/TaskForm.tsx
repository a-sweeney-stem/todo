"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { OnSubmitProps } from "@/app/page";

interface TaskFormProps {
  onSubmit: (props: OnSubmitProps) => void;
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [errorMesssage, setErrorMessage] = useState<string>("");
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTaskName(event.target.value);
  };

  const handleTextAreaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setTaskDescription(event.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    await onSubmit({
      taskName,
      taskDescription,
      taskCompleted,
      setErrorMessage,
    });

    resetInputs();
  };

  const resetInputs = (): void => {
    setTaskName("");
    setTaskDescription("");
    setTaskCompleted(false);
  };

  const updateIsValid = (taskName: string, taskDescription: string): void => {
    const isValid = taskName.length > 0 && taskDescription.length > 0;
    setIsValid(isValid);
  };

  useEffect(() => {
    updateIsValid(taskName, taskDescription);
  }, [taskName, taskDescription]);

  return (
    <div className={`container p-3 bg-info`} data-testID={"task-input"}>
      <div className="row-1">
        <input
          type="text"
          className="form-control"
          id="taskNameInput"
          placeholder="Enter Task Name"
          value={taskName}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div className="row-1 mb-2">
        <textarea
          className="form-control"
          rows={3}
          placeholder="Enter Task Description"
          value={taskDescription}
          onChange={handleTextAreaChange}
        />
      </div>
      <div className="row-1">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="btn btn-primary d-inline"
        >
          Submit
        </button>
        <p className="d-inline px-3">{errorMesssage}</p>
      </div>
    </div>
  );
};

export default TaskForm;
