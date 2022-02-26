import TodoItem from "../../components/TodoItem/TodoItem";
import TodoForm from "../../components/TodoForm/TodoForm";
import { useAppSelector } from "../../store/store";

function TodoTask() {
  const task = useAppSelector((state) => state.task);

  const taskElement = task.map((task) => {
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
