"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { OnSubmitProps } from "@/app/page";
import Form from "react-bootstrap/Form";

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
    <Form className={`container p-3 bg-info`} data-testID={"task-input"}>
      <Form.Group className="row-1" controlId="taskForm.taskNameInput">
        <Form.Control
          type="text"
          id="taskNameInput"
          placeholder="Enter Task Name"
          value={taskName}
          onChange={handleInputChange}
        />
        <Form.Label for="taskNameInput" className="d-none">Enter Task Name: </Form.Label>
      </Form.Group>
      <br />
      <Form.Group className="row-1 mb-2">
        <Form.Control
          as="textarea"
          id="taskDescriptionInput"
          rows={3}
          placeholder="Enter Task Description"
          value={taskDescription}
          onChange={handleTextAreaChange}
        />
        <Form.Label for="taskDescriptionInput" className="d-none">Enter Task Description: </Form.Label>
      </Form.Group>
      <Form.Group className="row-1">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="btn btn-primary d-inline"
        >
          Submit
        </button>
        <p className="d-inline px-3">{errorMesssage}</p>
      </Form.Group>
    </Form>
  );
};

export default TaskForm;
