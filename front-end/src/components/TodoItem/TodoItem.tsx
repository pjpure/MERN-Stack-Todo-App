import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./TodoItem.css";
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { deleteTask, editTask } from "../../store/slices/taskSlice";
import { useAppDispatch } from "../../store/store";
import { Task } from "../../types";
import { removeTask, updateTask } from "../../api/TaskAPI";
import { useAppSelector } from "../../store/store";
import { Spinner } from "react-bootstrap";

type Props = {
  task: Task;
};

function TodoItem({ task }: Props) {
  const [isDoneLoading, setDoneIsLoading] = useState(false);
  const [isRemoveLoading, setRemoveIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onDelete = () => {
    if (user) {
      setRemoveIsLoading(true);
      removeTask(task._id, user.token)
        .then((res) => {
          dispatch(deleteTask(res.data._id));
          setRemoveIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
          setRemoveIsLoading(false);
        });
    }
  };

  const onDone = () => {
    if (user) {
      setDoneIsLoading(true);
      let taskStatus = true;
      updateTask(task._id, { taskStatus }, user.token)
        .then((res) => {
          dispatch(editTask(res.data));
          setDoneIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
          setDoneIsLoading(false);
        });
    }
  };

  return (
    <div className="todo-item">
      <Row>
        <Col xs="8" className="todo-text">
          <h5>{task.taskName}</h5>
          <p>{task.taskDescription}</p>
        </Col>
        <Col xs="4" className="todo-btn">
          <Button style={{ width: "50px" }} variant="success" onClick={onDone}>
            {isDoneLoading ? (
              <Spinner size="sm" animation="border" variant="light" />
            ) : (
              <AiFillCheckCircle size={20} />
            )}
          </Button>
          <Button style={{ width: "50px" }} variant="danger" onClick={onDelete}>
            {isRemoveLoading ? (
              <Spinner size="sm" animation="border" variant="light" />
            ) : (
              <AiFillDelete size={20} />
            )}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default TodoItem;
