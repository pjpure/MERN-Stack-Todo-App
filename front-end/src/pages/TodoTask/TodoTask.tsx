import React, { useState, useEffect } from "react";
import TodoItem from "../../components/TodoItem/TodoItem";
import TodoForm from "../../components/TodoForm/TodoForm";
import { getTask } from "../../api/TaskAPI";
function TodoTask() {
  const [taskData, setTaskData] = useState<any>([]);

  useEffect(() => {
    getTask().then((data) => {
      console.log(data);
      setTaskData(data);
    });
  }, []);

  const taskElement = taskData.map((task: any) => {
    return (
      <TodoItem
        key={task._id}
        name={task.taskName}
        description={task.taskDescription}
      />
    );
  });

  const addTask = (task: any) => {
    setTaskData((prevData: any) => {
      return [...prevData, task];
    });
  };

  return (
    <div>
      <TodoForm addTask={addTask} />
      {taskElement}
    </div>
  );
}

export default TodoTask;
