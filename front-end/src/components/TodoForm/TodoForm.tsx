import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./TodoForm.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createTask } from "../../api/TaskAPI";
import { addTask } from "../../store/slices/taskSlice";
import { Task } from "../../types";
function TodoForm() {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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
    const token = localStorage.getItem("token");
    if (token && user) {
      createTask(user.id, { taskName, taskDescription }, token)
        .then((data: Task) => {
          dispatch(addTask(data));
          setTaskName("");
          setTaskDescription("");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
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
