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
    <ul className="w-full bg-l-very-light-gray rounded-lg max-h-[500px] overflow-auto">
      <DragAndDrop
        filteredTasks={filteredTasks}
        handleCompleteStatus={handleCompleteStatus}
        removeTaskHandler={removeTaskHandler}
      />
    </ul>
  );
}

// {taskList &&
//     filteredTasks.map((task: TaskType, i) => {
//       return (
//         <li
//           key={task.id}
//           data-id={task.id}
//           className="flex items-center justify-between w-full py-5 border-b-2 group "
//         >
//           <div className="flex gap-5 ml-12 items-center">
//             <div className="inline-flex items-center">
//               <label
//                 className="relative flex items-center  rounded-full cursor-pointer"
//                 htmlFor={`customStyle-${task.id}`}
//               >
//                 <input
//                   className="before:content[''] groupe hover:ring-2  peer relative h-8 w-8 cursor-pointer  appearance-none rounded-full  bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity  checked:bg-gradient-to-br from-light-blue-gradient to-purple-gradient checked:before:bg-check-gradient hover:before:opacity-0 "
//                   id={`customStyle-${task.id}`}
//                   type="checkbox"
//                   defaultChecked={task.completed ? true : false}
//                   onChange={handleCompleteStatus}
//                 />
//                 <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-3.5 w-3.5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     stroke="currentColor"
//                     strokeWidth="1"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </span>
//               </label>
//             </div>
//             <span
//               className={cn(
//                 task.completed
//                   ? "line-through text-l-dark-grayish-blue"
//                   : ""
//               )}
//             >
//               {task.title}
//             </span>
//           </div>
//           <div className="flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
//             <button className="mr-10 text-2xl" onClick={removeTaskHandler}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 50 50"
//                 width="32px"
//                 height="32px"
//               >
//                 <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
//               </svg>
//             </button>
//           </div>
//         </li>
//       );
//     })}
