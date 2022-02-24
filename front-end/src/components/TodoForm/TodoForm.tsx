import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./TodoForm.css";
function TodoForm({ addTask }: { addTask: (task: any) => void }) {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  const onTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const onTaskDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addTask({ name: taskName, description: taskDescription, date: Date() });
    setTaskName("");
    setTaskDescription("");
  };

  const onReset = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setTaskName("");
    setTaskDescription("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Form>
        <div className="task-input-area">
          <input
            type="text"
            className="task-name"
            placeholder="Task name"
            value={taskName}
            onChange={onTaskNameChange}
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
          onClick={onSubmit}
          style={{
            marginTop: "10px",
            marginRight: "10px",
            fontSize: "10pt",
            color: "white",
          }}
        >
          Add task
        </Button>
        <Button
          variant="secondary"
          onClick={onReset}
          style={{ marginTop: "10px", fontSize: "10pt" }}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default TodoForm;
