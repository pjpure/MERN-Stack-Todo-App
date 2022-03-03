//components
import TodoItem from "../../components/TodoItem/TodoItem";
import TodoForm from "../../components/TodoForm/TodoForm";
import Loading from "../../components/Loading/Loading";

//query and store
import { useTasksQuery } from "../../services/tasksApi";
import { useAppSelector } from "../../store/store";

//types
import { Task } from "../../types";

function TodoTask() {
  const user = useAppSelector((state) => state.auth.user);

  const { data: tasks, isLoading, error } = useTasksQuery(user?.id);
  const taskElement = tasks
    ?.filter((task: Task) => {
      return task.taskStatus === false;
    })
    .sort((a: Task, b: Task) => {
      return Date.parse(b.created_at) - Date.parse(a.created_at);
    })
    .map((task: Task) => {
      return <TodoItem key={task._id} task={task} />;
    });

  return (
    <div>
      <TodoForm />
      {!isLoading ? taskElement : <Loading />}
    </div>
  );
}

export default TodoTask;
