import { useContext } from "react";
import { TaskContext, TaskType } from "../lib/context/Tasks";

import DragAndDrop from "./DragAndDropWrapper";
import { updateLocalStorage, updateTasksAndLocalStorage } from "../lib/utils";

export default function TaskList({
  taskList,
  filteredTasks,
}: {
  taskList: Array<TaskType>;
  filteredTasks: Array<TaskType>;
}) {
  const context = useContext(TaskContext);
  const { setTasks, setFilteredTasks } = context;

  const removeTaskHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const listItem = (event.target as HTMLElement).closest("li");

    const updatedList = taskList.filter(
      (task) => listItem?.dataset.id !== task.id
    );
    updateTasksAndLocalStorage(
      setFilteredTasks,
      setTasks,
      updateLocalStorage,
      updatedList
    );
  };

  const handleCompleteStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const listItem = event.target.closest("li");
    // mapping to update state and rerender component so "new styles" like line-through, color change would apply
    const updatedList = taskList.map((task) => {
      if (listItem?.dataset.id === task.id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    updateTasksAndLocalStorage(
      setFilteredTasks,
      setTasks,
      updateLocalStorage,
      updatedList
    );
  };

  return (
    <ul className="w-full bg-l-very-light-gray dark:bg-d-very-dark-desaturated-blue rounded-lg max-h-[420px] md:max-h-[490px] overflow-auto">
      <DragAndDrop
        filteredTasks={filteredTasks}
        handleCompleteStatus={handleCompleteStatus}
        removeTaskHandler={removeTaskHandler}
      />
    </ul>
  );
}
