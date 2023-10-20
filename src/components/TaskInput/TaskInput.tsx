"use client";
import "bootstrap/dist/css/bootstrap.css";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./TaskInput.module.css";

const TaskInput = () => {
  const [errorMesssage, setErrorMessage] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(event.target.value);
  };

  const handleCheckboxChange = () => {
    setTaskCompleted((oldVal) => !oldVal);
  };

  const handleClickSubmit = (props: {
    taskName: string;
    taskDescription: string;
    taskCompleted: boolean;
    setErrorMessage: Dispatch<SetStateAction<string>>;
  }) => {};

  const updateIsValid = (taskName: string, taskDescription: string) => {
    const isValid = taskName.length > 0 && taskDescription.length > 0;
    setIsValid(isValid);
  };

  useEffect(() => {
    updateIsValid(taskName, taskDescription);
  }, [taskName, taskDescription]);

  return (
    <div className={`${styles.taskInputContainer} container p-3 bg-info`}>
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
      <div className="row-1 form-check mb-2">
        <input
          className="form-check-input d-inline"
          type="checkbox"
          id="taskCompletedCheckbox"
          checked={taskCompleted}
          onChange={handleCheckboxChange}
        />
        <label
          className="form-check-label d-inline"
          htmlFor="taskCompletedCheckbox"
        >
          Task Completed
        </label>
      </div>
      <div className="row-1">
        <button
          onClick={() =>
            handleClickSubmit({
              taskName,
              taskDescription,
              taskCompleted,
              setErrorMessage,
            })
          }
          disabled={!isValid}
          className="d-inline"
        >
          Submit
        </button>
        <p className="d-inline px-3">{errorMesssage}</p>
      </div>
    </div>
  );
};

export default TaskInput;