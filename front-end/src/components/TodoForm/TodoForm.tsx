import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./TodoForm.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createTask } from "../../api/TaskAPI";
import { addTask } from "../../store/slices/taskSlice";
import { Task } from "../../types";
import { Spinner } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
function TodoForm() {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleTask, setToggleTask] = useState<Boolean>(true);
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

  const onSubmit: any = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (user) {
      setIsLoading(true);
      createTask(user.id, { taskName, taskDescription }, user.token)
        .then((data: Task) => {
          addTaskToggle();
          setTaskName("");
          setTaskDescription("");
          setIsLoading(false);
          dispatch(addTask(data));
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response) {
            alert(error.response.data);
          } else {
            alert(error.message);
          }
        });
    }
  };

  const onReset = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setTaskName("");
    setTaskDescription("");
    addTaskToggle();
  };

  const addTaskToggle = () => {
    setToggleTask(!toggleTask);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {toggleTask ? (
        <div>
          <Button onClick={addTaskToggle}>
            <AiOutlinePlus /> Add task
          </Button>
          <br />
        </div>
      ) : (
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
              "Add task"
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={onReset}
            style={{ marginTop: "10px", fontSize: "10pt" }}
          >
            Cancel
          </Button>
        </form>
      )}
      <hr />
    </div>
  );
}

export default TodoForm;
