import { useEffect, useState } from "react";
import { TaskType } from "../lib/context/Tasks";

export default function TaskCount({ tasks }: { tasks: Array<TaskType> }) {
  const [activeTasks, setActiveTasks] = useState<number>(0);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => !task.completed);
    setActiveTasks(filteredTasks.length);
  }, [tasks]);

  return (
    <span className=" text-l-dark-grayish-blue text-xs md:text-sm dark:text-d-light-grayish-blue">
      {activeTasks} {activeTasks === 1 ? "item" : "items"} left
    </span>
  );
}
