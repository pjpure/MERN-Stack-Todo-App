import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./TodoEditForm.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { updateTask } from "../../api/TaskAPI";
import { editTask } from "../../store/slices/taskSlice";
import { Task } from "../../types";
import { Spinner } from "react-bootstrap";

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
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit: any = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (user) {
      setIsLoading(true);
      updateTask(task._id, { taskName, taskDescription }, user.token)
        .then((res) => {
          setIsLoading(false);
          dispatch(editTask(res.data));
          editFormToggle();
        })
        .catch((err) => {
          console.log(err.response.data);
          setIsLoading(false);
        });
    }
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
