import React, { useState, useEffect } from "react";
import TodoItem from "../../components/TodoItem/TodoItem";
import TodoForm from "../../components/TodoForm/TodoForm";
import { getTask } from "../../api/TaskAPI";
function TodoTask() {
  const [taskData, setTaskData] = useState<any>([]);

  useEffect(() => {
    getTask().then((data) => {
      setTaskData(data);
    });
  }, []);

  const removeTask = (_id: string) => {
    const newTaskData = taskData.filter((task: any) => task._id !== _id);
    setTaskData(newTaskData);
  };

  const addTask = (task: any) => {
    setTaskData((prevData: any) => {
      return [...prevData, task];
    });
  };

  const taskElement = taskData.map((task: any) => {
    return (
      <TodoItem
        key={task._id}
        _id={task._id}
        name={task.taskName}
        description={task.taskDescription}
        removeTask={removeTask}
      />
    );
  });

  return (
    <div>
      <TodoForm addTask={addTask} />
      {taskElement}
    </div>
  );
}

export default TodoTask;
