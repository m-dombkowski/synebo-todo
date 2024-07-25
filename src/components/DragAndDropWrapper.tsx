import { useContext } from "react";
import { TaskContext, TaskType } from "../lib/context/Tasks";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import React from "react";
import {
  cn,
  updateLocalStorage,
  updateTasksAndLocalStorage,
} from "../lib/utils";

import { ScreenSizeContext } from "../lib/context/ScreenSize";

export default function DragAndDrop({
  handleCompleteStatus,
  removeTaskHandler,
  filteredTasks,
}: {
  handleCompleteStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeTaskHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  filteredTasks: Array<TaskType>;
}) {
  const context = useContext(TaskContext);
  const { deviceType } = useContext(ScreenSizeContext);
  const { setFilteredTasks, setTasks } = context;

  const reorder = (
    list: Array<TaskType>,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const Task = ({
    task,
    index,
    handleCompleteStatus,
    removeTaskHandler,
  }: {
    task: TaskType;
    index: number;
    handleCompleteStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
    removeTaskHandler: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
  }) => {
    return (
      <>
        <Draggable draggableId={task.id} index={index}>
          {(provided) => (
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={task.id}
              data-id={task.id}
              className="flex items-center justify-between w-full py-5 border-b-2 group "
            >
              <div className="flex gap-3.5 md:gap-5 ml-6 md:ml-12 items-center">
                <div className="inline-flex items-center ">
                  <div className="bg-l-light-grayish-blue hover:bg-gradient-to-br from-light-blue-gradient to-purple-gradient rounded-full w-[18px] h-[18px] md:w-[26px] md:h-[26px] flex justify-center items-center">
                    <label
                      className="relative flex items-center md:w-6 md:h-6  rounded-full cursor-pointer z-50 bg-white"
                      htmlFor={`customStyle-${task.id}`}
                    >
                      <input
                        className="before:content['']   peer relative w-4 h-4 md:h-6 md:w-6 cursor-pointer  appearance-none rounded-full   transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity  checked:bg-gradient-to-br from-light-blue-gradient to-purple-gradient checked:before:bg-check-gradient hover:before:opacity-0"
                        id={`customStyle-${task.id}`}
                        type="checkbox"
                        defaultChecked={task.completed ? true : false}
                        onChange={handleCompleteStatus}
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2.5 h-2.5 md:h-3.5 md:w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </div>
                </div>
                <span
                  className={cn(
                    task.completed
                      ? "line-through text-l-dark-grayish-blue"
                      : "",
                    "text-[0.7rem] md:text-xl"
                  )}
                >
                  {task.title}
                </span>
              </div>
              <div className="flex justify-center items-center md:opacity-0 md:group-hover:opacity-100 transition duration-300">
                <button
                  className="mr-5 text-lg md:mr-10 md:text-2xl"
                  onClick={removeTaskHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width={`${deviceType === "desktop" ? "24px" : "16px"}`}
                    height={`${deviceType === "desktop" ? "24px" : "16px"}`}
                  >
                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                  </svg>
                </button>
              </div>
            </li>
          )}
        </Draggable>
      </>
    );
  };

  const TaskList = ({ tasks }: { tasks: Array<TaskType> }) => {
    return tasks.map((task: TaskType, index: number) => (
      <Task
        handleCompleteStatus={handleCompleteStatus}
        removeTaskHandler={removeTaskHandler}
        task={task}
        index={index}
        key={task.id}
      />
    ));
  };

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    if (!filteredTasks) return;

    const tasks = reorder(
      filteredTasks,
      result.source.index,
      result.destination.index
    );
    updateTasksAndLocalStorage(
      setFilteredTasks,
      setTasks,
      updateLocalStorage,
      tasks
    );
  }
  if (!context) return;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {filteredTasks && (
              <>
                <TaskList tasks={filteredTasks} />
                {provided.placeholder}
              </>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
