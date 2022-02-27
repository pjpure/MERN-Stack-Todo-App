import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./TodoItem.css";
import { AiFillEdit, AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { deleteTask, editTask } from "../../store/slices/taskSlice";
import { useAppDispatch } from "../../store/store";
import { Task } from "../../types";
import { removeTask, updateTask } from "../../api/TaskAPI";

type Props = {
  task: Task;
};

function TodoItem({ task }: Props) {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  const onDelete = () => {
    if (token) {
      removeTask(task._id, token)
        .then((res) => {
          dispatch(deleteTask(res.data._id));
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };

  const onDone = () => {
    if (token) {
      let taskStatus = true;
      updateTask(task._id, { taskStatus }, token)
        .then((res) => {
          dispatch(editTask(res.data));
        })
        .catch((err) => {
          console.log(err.response.data);
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
          {/* <Button variant="primary">
            <AiFillEdit size={20} />
          </Button> */}
          <Button variant="success" onClick={onDone}>
            <AiFillCheckCircle size={20} />
          </Button>
          <Button variant="danger">
            <AiFillDelete size={20} onClick={onDelete} />
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default TodoItem;
