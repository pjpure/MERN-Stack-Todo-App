import React, { useState, useEffect } from "react";
import TodoItem from "../../components/TodoItem/TodoItem";
import TodoForm from "../../components/TodoForm/TodoForm";

function TodoTask() {
  const [taskData, setTaskData] = useState<any>([]);

  const taskElement = taskData
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .map((item: any, index: number) => {
      return <TodoItem key={index} name={item.name} description={item.des} />;
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
