import React, { useState } from "react";
//query and store
import { useAppSelector } from "../../store/store";
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../services/tasksApi";
//components
import TodoEditForm from "../TodoEditForm/TodoEditForm";
//types
import { Task } from "../../types";
//styles
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { AiFillDelete, AiFillCheckCircle, AiFillEdit } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import "./TodoItem.css";

type Props = {
  task: Task;
};

function TodoItem({ task }: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [isEdit, setIsEdit] = useState(false);

  const onDelete = async () => {
    await deleteTask(task._id);
  };

  const onDone = async () => {
    await updateTask({ id: task._id, task: { taskStatus: true } });
  };

  const onRedo = async () => {
    await updateTask({ id: task._id, task: { taskStatus: false } });
  };

  const editFormToggle = () => {
    setIsEdit(!isEdit);
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
              {isUpdating ? (
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
              {isDeleting ? (
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
              variant="primary"
              onClick={editFormToggle}
            >
              <AiFillEdit size={20} />
            </Button>
            <Button
              style={{ width: "50px" }}
              variant="success"
              onClick={onDone}
            >
              {isUpdating ? (
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
              {isDeleting ? (
                <Spinner size="sm" animation="border" variant="light" />
              ) : (
                <AiFillDelete size={20} />
              )}
            </Button>
          </Col>
        )}
      </Row>
      <Row>
        {isEdit && <TodoEditForm task={task} editFormToggle={editFormToggle} />}
      </Row>
    </div>
  );
}

export default TodoItem;
