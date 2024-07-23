/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from "react";
import { TaskContext, TaskType } from "../lib/context/Tasks";

export default function TaskList({
  taskList,
}: {
  taskList: TaskType[] | undefined;
}) {
  const context = useContext(TaskContext);

  const { tasks } = context;

  const handleCompleteStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    tasks.forEach((task, i) => {
      console.log(i);
    });
    // console.log(event.currentTarget);
  };

  return (
    <ul>
      {taskList &&
        taskList.map((task: TaskType, i) => {
          return (
            <li key={i}>
              <input type="checkbox" onChange={handleCompleteStatus}></input>
              <span>{task.title}</span>
            </li>
          );
        })}
    </ul>
  );
}
