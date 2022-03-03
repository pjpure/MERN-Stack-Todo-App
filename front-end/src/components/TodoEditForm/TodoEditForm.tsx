import React, { useState } from "react";
//services and store
import { useAppSelector } from "../../store/store";
import { useUpdateTaskMutation } from "../../services/tasksApi";
//types
import { Task } from "../../types";
//styles
import { Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./TodoEditForm.css";

function TodoEditForm({
  task,
  editFormToggle,
}: {
  task: Task;
  editFormToggle: any;
}) {
  const [taskName, setTaskName] = useState<string>(task.taskName);
  const [taskDescription, setTaskDescription] = useState<string>(
    task.taskDescription
  );

  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const { user } = useAppSelector((state) => state.auth);

  const onTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let data: string = event.target.value;
    if (data === " ") {
      data = "";
    }
    setTaskName(data);
  };

  const onTaskDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let data: string = event.target.value;
    if (data === " ") {
      data = "";
    }
    setTaskDescription(data);
  };

  const onSubmit: any = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await updateTask({ id: task._id, task: { taskName, taskDescription } });
    editFormToggle();
  };

  const onCancel = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    editFormToggle();
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={onSubmit}>
        <div className="task-input-area">
          <input
            type="text"
            className="task-name"
            placeholder="Task name"
            value={taskName}
            onChange={onTaskNameChange}
            required
          />
          <textarea
            className="task-description"
            rows={4}
            placeholder="Description"
            value={taskDescription}
            onChange={onTaskDescriptionChange}
          />
        </div>
        <Button
          variant="primary"
          type="submit"
          style={{
            marginTop: "10px",
            marginRight: "10px",
            fontSize: "10pt",
            color: "white",
            width: "90px",
          }}
        >
          {isLoading ? (
            <Spinner size="sm" animation="border" variant="light" />
          ) : (
            "Edit task"
          )}
        </Button>
        <Button
          variant="secondary"
          onClick={onCancel}
          style={{ marginTop: "10px", fontSize: "10pt" }}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default TodoEditForm;
