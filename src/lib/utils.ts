import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TaskType } from "./context/Tasks";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export const updateLocalStorage = (array: Array<TaskType>) => {
  localStorage.setItem("tasks-synebo", JSON.stringify(array));
};

export const updateTasksAndLocalStorage = (
  updateFilteredTasks: (value: React.SetStateAction<Array<TaskType>>) => void,
  updateTasks: (value: React.SetStateAction<Array<TaskType>>) => void,
  updateLS: (array: Array<TaskType>) => void,
  array: Array<TaskType>
) => {
  updateFilteredTasks(array);
  updateTasks(array);
  updateLS(array);
};

export const getLocalStorage = () => {
  localStorage.getItem("tasks-synebo");
};
