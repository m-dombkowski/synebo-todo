import { useContext } from "react";
import { TaskContext, TaskType } from "../lib/context/Tasks";
import { updateLocalStorage, updateTasksAndLocalStorage } from "../lib/utils";

export default function ClearCompletedTasks({
  tasks,
}: {
  tasks: Array<TaskType>;
}) {
  const context = useContext(TaskContext);
  const { setFilteredTasks, setTasks } = context;

  const clearCompletedTasksHandler = () => {
    const clearedTasks = tasks.filter((task) => task.completed === false);

    updateTasksAndLocalStorage(
      setFilteredTasks,
      setTasks,
      updateLocalStorage,
      clearedTasks
    );
  };

  return (
    <button
      className="text-l-dark-grayish-blue hover:text-l-very-dark-grayish-blue transition duration-300 text-sm dark:text-d-light-grayish-blue dark:hover:text-d-light-grayish-blue-hover"
      onClick={clearCompletedTasksHandler}
    >
      Clear Completed
    </button>
  );
}
