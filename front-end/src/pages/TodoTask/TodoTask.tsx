import TodoItem from "../../components/TodoItem/TodoItem";
import TodoForm from "../../components/TodoForm/TodoForm";
import { useAppSelector, useAppDispatch } from "../../store/store";
import React, { useEffect, useState } from "react";
import { getTask } from "../../api/TaskAPI";
import { addAllTask } from "../../store/slices/taskSlice";
import { Task } from "../../types";
import { Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
function TodoTask() {
  const task = useAppSelector((state) => state.task);
  const user = useAppSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");

  const [addTask, setAddTask] = useState<Boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user && token) {
      getTask(user.id, token)
        .then((data: Task[]) => {
          dispatch(addAllTask(data));
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, []);

  const addTaskToggle = () => {
    setAddTask(!addTask);
  };
  const taskElement = task
    .filter((task) => {
      return task.taskStatus === false;
    })
    .sort((a, b) => {
      return Date.parse(b.created_at) - Date.parse(a.created_at);
    })
    .map((task) => {
      return <TodoItem key={task._id} task={task} />;
    });

  return (
    <div>
      {addTask ? (
        <TodoForm addTaskToggle={addTaskToggle} />
      ) : (
        <div>
          <br />
          <Button onClick={addTaskToggle}>
            <AiOutlinePlus /> Add task
          </Button>
          <br />
          <hr />
        </div>
      )}

      {taskElement}
    </div>
  );
}

export default TodoTask;
