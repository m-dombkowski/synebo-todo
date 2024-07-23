/* eslint-disable @typescript-eslint/no-unused-vars */

import { TaskType } from "../lib/context/Tasks";

export default function TaskList({
  taskList,
}: {
  taskList: TaskType[] | undefined;
}) {
  const handleCompleteStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const listItem = event.target.closest("li");

    taskList?.forEach((task) => {
      if (listItem?.dataset.id === task.id) {
        task.completed = !task.completed;
        return;
      }
    });
    console.log(taskList);
  };

  return (
    <ul className="w-full bg-l-very-light-gray rounded-lg">
      {taskList &&
        taskList.map((task: TaskType, i) => {
          return (
            <li
              key={i}
              data-id={task.id}
              className="flex items-center justify-between w-full py-5 border-b-2"
            >
              <div className="flex gap-5 ml-12 items-center">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center  rounded-full cursor-pointer"
                    htmlFor="customStyle"
                  >
                    <input
                      className="before:content[''] border-2 border-check-gradient peer relative h-8 w-8 cursor-pointer  appearance-none rounded-full  bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity  checked:bg-gradient-to-br from-light-blue-gradient to-purple-gradient checked:before:bg-check-gradient hover:before:opacity-0 hover:border-2 hover:border-bright-blue"
                      id="customStyle"
                      type="checkbox"
                      onChange={handleCompleteStatus}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
                <span>{task.title}</span>
              </div>
              <div className="flex justify-center items-center">
                <button className="mr-10 text-2xl">X</button>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
