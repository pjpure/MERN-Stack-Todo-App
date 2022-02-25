import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./TodoForm.css";
import { createTask } from "../../api/TaskAPI";

type ItemProps = {
  addTask: (task: any) => void;
};
function TodoForm({ addTask }: ItemProps) {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

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

  const onSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    createTask({ taskName, taskDescription })
      .then((res) => {
        console.log(res);
        addTask(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
      <form>
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
      </form>
    </div>
  );
}

export default TodoForm;
