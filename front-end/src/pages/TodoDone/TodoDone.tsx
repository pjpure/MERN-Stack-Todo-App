//components
import TodoItem from "../../components/TodoItem/TodoItem";
import Loading from "../../components/Loading/Loading";

//query and store
import { useTasksQuery } from "../../services/tasksApi";
import { useAppSelector } from "../../store/store";

//types
import { Task } from "../../types";

function TodoDone() {
  const user = useAppSelector((state) => state.auth.user);

  const { data: tasks, isLoading, error } = useTasksQuery(user.id);
  const taskElement = tasks
    ?.filter((task: Task) => {
      return task.taskStatus === true;
    })
    .sort((a: Task, b: Task) => {
      return Date.parse(b.created_at) - Date.parse(a.created_at);
    })
    .map((task: Task) => {
      return <TodoItem key={task._id} task={task} />;
    });

  return <div>{!isLoading ? taskElement : <Loading />}</div>;
}

export default TodoDone;
