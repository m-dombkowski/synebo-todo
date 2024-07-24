import { useContext } from "react";
import { TaskContext, TaskType } from "../lib/context/Tasks";

export default function ClearCompletedTasks({ tasks }: { tasks: TaskType[] }) {
  const context = useContext(TaskContext);
  if (!context) return;

  const { setFilteredTasks, setTasks } = context;

  const clearCompletedTasksHandler = () => {
    const clearedTasks = tasks.filter((task) => task.completed === false);

    setFilteredTasks(clearedTasks);
    setTasks(clearedTasks);
  };

  return (
    <button
      className="text-l-dark-grayish-blue hover:text-l-very-dark-grayish-blue transition duration-300"
      onClick={clearCompletedTasksHandler}
    >
      Clear Completed
    </button>
  );
}
