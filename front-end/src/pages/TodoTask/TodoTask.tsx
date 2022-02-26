import TodoItem from "../../components/TodoItem/TodoItem";
import TodoForm from "../../components/TodoForm/TodoForm";
import { useSelector } from "react-redux";

function TodoTask() {
  const task = useSelector((state: any) => state.task);

  const taskElement = task.map((task: any) => {
    return <TodoItem key={task._id} task={task} />;
  });

  return (
    <div>
      <TodoForm />
      {task.length === 0 ? <p>Task is empty</p> : taskElement}
    </div>
  );
}

export default TodoTask;
