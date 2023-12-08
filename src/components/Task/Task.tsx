"use client";
import { ChangeEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import { validation } from "@/helpers/validation";

interface TaskProps {
  taskName: string;
  taskDescription: string;
  taskCompleted: boolean;
  id: number;
  updateTasks: () => void;
}

const Task = (props: TaskProps) => {
  const { updateTasks, id } = props;
  const [isTaskOpen, setIsTaskOpen] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>(props.taskName);
  const [taskDescription, setTaskDescription] = useState<string>(
    props.taskDescription
  );
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTaskName(event.target.value);
  };

  const handleOpenTask = (): void => {
    setIsTaskOpen((oldVal) => !oldVal);
  };

  const handleToggleTaskCompleted = (): void => {
    setTaskCompleted((oldVal) => !oldVal);
  };

  const handleTextAreaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setTaskDescription(event.target.value);
  };

  const handleDelete = async (): Promise<void> => {
    await fetch(`/api/task/${id}`, {
      method: "DELETE",
    });
    updateTasks();
  };

  const handleSave = async (): Promise<void> => {
    const newTask = {
      taskName,
      taskDescription,
      taskCompleted,
    };

    const validatedNewTask = validation.safeParse(newTask);
    if (!validatedNewTask.success) {
      throw new Error("Validation Error");
    }

    await fetch(`/api/task/${props.id}`, {
      method: "PUT",
      body: JSON.stringify(validatedNewTask),
    });
  };

  return (
    <Form className={`container p-3 bg-info`} data-testID={`task-${id}`}>
      <Form.Group className="row-1 d-flex flex-row justify-content-between">
        <button
          onClick={handleOpenTask}
          className={`btn btn-secondary ${isTaskOpen ? "bi-dash" : "bi-plus"}`}
          data-testID={`open-toggle-${id}`}
        ></button>

        <Form.Group className="row-1 d-flex">
          <Form.Control
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
          <button
            className="btn btn-secondary bi-floppy m-1"
            onClick={handleSave}
          />
          <button
            className="btn btn-secondary bi-trash"
            onClick={handleDelete}
            data-testID={`delete-button-${id}`}
          />
        </div>
      </Form.Group>

      {isTaskOpen && (
        <Form.Group className="row-1">
          <Form.Group className="row-1 mt-4 mb-2">
            <Form.Control
              as="textarea"
              className="form-control"
              rows={3}
              placeholder="Enter Task Description"
              value={taskDescription}
              onChange={handleTextAreaChange}
              data-testID={`task-description-${id}`}
            />
          </Form.Group>

          <Form.Group className="row-1 form-check mb-2">
            <Form.Control
              className="form-check-input d-inline"
              type="checkbox"
              id="taskCompletedCheckbox"
              checked={taskCompleted}
              onChange={handleToggleTaskCompleted}
              data-testID={`completed-toggle-${id}`}
            />
            <Form.Label
              className="form-check-label d-inline"
              htmlFor="taskCompletedCheckbox"
            >
              Task Completed
            </Form.Label>
          </Form.Group>
        </Form.Group>
      )}
    </Form>
  );
};

export default Task;
