/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, ReactNode, createContext, useState } from "react";

export type TaskType = {
  title: string;
  completed: boolean;
  id: `${string}-${string}-${string}-${string}-${string}`;
};

interface TaskContextType {
  tasks: Array<TaskType>;
  filteredTasks: Array<TaskType>;
  setTasks: React.Dispatch<React.SetStateAction<Array<TaskType>>>;
  setFilteredTasks: React.Dispatch<React.SetStateAction<Array<TaskType>>>;
}

const defaultContext = {
  tasks: [],
  filteredTasks: [],
  setFilteredTasks: () => {},
  setTasks: () => {},
};

export const TaskContext = createContext<TaskContextType>(defaultContext);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Array<TaskType>>([]);
  const [filteredTasks, setFilteredTasks] = useState<Array<TaskType>>([]);

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, filteredTasks, setFilteredTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};
