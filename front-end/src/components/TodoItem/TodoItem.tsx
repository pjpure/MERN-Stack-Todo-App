import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./TodoItem.css";
import { AiFillEdit, AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { deleteTask } from "../../store/slices/taskSlice";
import { useDispatch } from "react-redux";

type ItemProps = {
  task: any;
};

function TodoItem({ task }: ItemProps) {
  const dispatch = useDispatch();

  return (
    <div className="todo-item">
      <Row>
        <Col xs="8" className="todo-text">
          <h5>{task.taskName}</h5>
          <p>{task.taskDescription}</p>
        </Col>
        <Col xs="4" className="todo-btn">
          <Button variant="primary">
            <AiFillEdit size={20} />
          </Button>
          <Button variant="success">
            <AiFillCheckCircle size={20} />
          </Button>
          <Button variant="danger">
            <AiFillDelete
              size={20}
              onClick={() => dispatch(deleteTask(task._id))}
            />
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default TodoItem;
