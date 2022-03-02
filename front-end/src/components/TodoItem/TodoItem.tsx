import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./TodoItem.css";
import { AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
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
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const [isRemoveLoading, setRemoveIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onDelete = () => {
    if (user) {
      setRemoveIsLoading(true);
      removeTask(task._id, user.token)
        .then((res) => {
          setRemoveIsLoading(false);
          dispatch(deleteTask(res.data._id));
        })
        .catch((err) => {
          console.log(err.response.data);
          setRemoveIsLoading(false);
        });
    }
  };

  const onDone = () => {
    if (user) {
      setIsDoneLoading(true);
      let taskStatus = true;
      updateTask(task._id, { taskStatus }, user.token)
        .then((res) => {
          setIsDoneLoading(false);
          dispatch(editTask(res.data));
        })
        .catch((err) => {
          console.log(err.response.data);
          setIsDoneLoading(false);
        });
    }
  };

  const onRedo = () => {
    if (user) {
      setIsBackLoading(true);
      let taskStatus = false;
      updateTask(task._id, { taskStatus }, user.token)
        .then((res) => {
          setIsBackLoading(false);
          dispatch(editTask(res.data));
        })
        .catch((err) => {
          console.log(err.response.data);
          setIsBackLoading(false);
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
        {task.taskStatus ? (
          <Col xs="4" className="todo-btn">
            <Button
              style={{ width: "50px" }}
              variant="secondary"
              onClick={onRedo}
            >
              {isBackLoading ? (
                <Spinner size="sm" animation="border" variant="light" />
              ) : (
                <VscDebugRestart size={20} />
              )}
            </Button>
            <Button
              style={{ width: "50px" }}
              variant="danger"
              onClick={onDelete}
            >
              {isRemoveLoading ? (
                <Spinner size="sm" animation="border" variant="light" />
              ) : (
                <AiFillDelete size={20} />
              )}
            </Button>
          </Col>
        ) : (
          <Col xs="4" className="todo-btn">
            <Button
              style={{ width: "50px" }}
              variant="success"
              onClick={onDone}
            >
              {isDoneLoading ? (
                <Spinner size="sm" animation="border" variant="light" />
              ) : (
                <AiFillCheckCircle size={20} />
              )}
            </Button>
            <Button
              style={{ width: "50px" }}
              variant="danger"
              onClick={onDelete}
            >
              {isRemoveLoading ? (
                <Spinner size="sm" animation="border" variant="light" />
              ) : (
                <AiFillDelete size={20} />
              )}
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default TodoItem;
