import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./TodoItem.css";
import { AiFillEdit, AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { deleteTask, updateTask } from "../../api/TaskAPI";

type ItemProps = {
  _id: string;
  name: string;
  description: string;
  removeTask: (_id: string) => void;
};

function TodoItem({ _id, name, description, removeTask }: ItemProps) {
  const onRemoveTask = (_id: string) => {
    deleteTask(_id).then((res) => {
      removeTask(res.data._id);
    });
  };

  const onUpdateTask = (_id: string, task: any) => {
    updateTask(_id, task).then((res) => {
      console.log(res);
    });
  };

  const onEditTask = (_id: string, task: any) => {
    console.log(_id);
  };

  const onDoneTask = (_id: string) => {
    onUpdateTask(_id, { taskStatus: true });
  };

  return (
    <div className="todo-item">
      <Row>
        <Col xs="8" className="todo-text">
          <h5>{name}</h5>
          <p>{description}</p>
        </Col>
        <Col xs="4" className="todo-btn">
          <Button
            variant="primary"
            onClick={() => onEditTask(_id, { name, description })}
          >
            <AiFillEdit size={20} />
          </Button>
          <Button variant="success" onClick={() => onDoneTask(_id)}>
            <AiFillCheckCircle size={20} />
          </Button>
          <Button variant="danger" onClick={() => onRemoveTask(_id)}>
            <AiFillDelete size={20} />
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default TodoItem;
