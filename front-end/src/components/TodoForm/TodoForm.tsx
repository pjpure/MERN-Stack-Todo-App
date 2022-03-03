import React, { useState } from "react";

//services and store
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useAddTaskMutation } from "../../services/tasksApi";

//types
import { Task } from "../../types";

//styles
import { Button, Spinner } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import "./TodoForm.css";

function TodoForm() {
  const { user } = useAppSelector((state) => state.auth);
  const [addTask, { isLoading }] = useAddTaskMutation();
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [toggleTask, setToggleTask] = useState<Boolean>(true);

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

    if (user) {
      await addTask({ task: { taskName, taskDescription }, userId: user.id });
      addTaskToggle();
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
