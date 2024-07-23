/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, ReactNode, createContext, useState } from "react";

export type TaskType = {
  title: string;
  completed: boolean;
  id: `${string}-${string}-${string}-${string}-${string}`;
};

interface TaskContextType {
  tasks: Array<TaskType>;
  addTask: React.Dispatch<React.SetStateAction<Array<TaskType>>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
  const [tasks, addTask] = useState<Array<TaskType>>([]);

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
