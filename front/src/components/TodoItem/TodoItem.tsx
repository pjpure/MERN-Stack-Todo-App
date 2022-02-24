import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./TodoItem.css";
import { AiFillEdit, AiFillDelete, AiFillCheckCircle } from "react-icons/ai";

type ItemProps = {
  name: string;
  description: string;
};

function TodoItem({ name, description }: ItemProps) {
  return (
    <div className="todo-item">
      <Row>
        <Col xs="8" className="todo-text">
          <h5>{name}</h5>
          <p>{description}</p>
        </Col>
        <Col xs="4" className="todo-btn">
          <Button variant="primary">
            <AiFillEdit size={20} />
          </Button>
          <Button variant="success">
            <AiFillCheckCircle size={20} />
          </Button>
          <Button variant="danger">
            <AiFillDelete size={20} />
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default TodoItem;
