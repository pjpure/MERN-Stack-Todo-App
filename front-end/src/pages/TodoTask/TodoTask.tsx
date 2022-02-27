import TodoItem from "../../components/TodoItem/TodoItem";
import TodoForm from "../../components/TodoForm/TodoForm";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import { getTask } from "../../api/TaskAPI";
import { addAllTask } from "../../store/slices/taskSlice";
import { Task } from "../../types";
import Loading from "../../components/Loading/Loading";
function TodoTask() {
  const task = useAppSelector((state) => state.task);
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      getTask(user.id, user.token)
        .then((data: Task[]) => {
          dispatch(addAllTask(data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
          setIsLoading(false);
        });
    }
  }, [user, dispatch]);

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
      <TodoForm />

      {!isLoading ? taskElement : <Loading />}
    </div>
  );
}

export default TodoTask;
