/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useContext, useEffect, useState } from "react";
import { TaskContext, TaskType } from "../lib/context/Tasks";
import { motion } from "framer-motion";

type FiltersType = {
  name: string;
  completed: boolean[];
};

export default function BottomFilters() {
  const context = useContext(TaskContext);
  const [chosenFilter, setChosenFilter] = useState<boolean[]>([true, false]);
  if (!context) {
    throw new Error("This Component must by used within a TaskProvider");
  }

  const { tasks, setFilteredTasks } = context;

  const filters: FiltersType[] = [
    {
      name: "All",
      completed: [true, false],
    },
    {
      name: "Active",
      completed: [false],
    },
    {
      name: "Completed",
      completed: [true],
    },
  ];

  const handleFilteringTasks = useCallback(
    (chosenFilterValue: boolean[]) => {
      setFilteredTasks([]);
      setChosenFilter(chosenFilterValue);
      tasks.forEach((task) => {
        const isMutual = chosenFilterValue.includes(task.completed);
        console.log(isMutual);
        if (isMutual) {
          setFilteredTasks((prevState) => [...prevState, task]);
        }
      });
    },
    [setFilteredTasks, tasks]
  );

  useEffect(() => {
    handleFilteringTasks(chosenFilter);
  }, [chosenFilter, handleFilteringTasks]);

  const HighlightedFilterButton = ({ name }: { name: string }) => {
    return (
      <span className=" text-bright-blue font-josefinSansBold">{name}</span>
    );
  };

  const FilterButton = ({ name }: { name: string }) => {
    return (
      <span className="text-l-dark-grayish-blue font-josefinSansBold hover:text-l-very-dark-grayish-blue transition duration-300">
        {name}
      </span>
    );
  };

  return (
    <ul className="flex gap-5 justify-center items-center ">
      {filters.map((filter, index) => {
        return filter.completed[0] === chosenFilter[0] &&
          filter.completed[1] === chosenFilter[1] ? (
          <li key={index}>
            <button
              value={filter.completed.toString()}
              onClick={() => handleFilteringTasks(filter.completed)}
            >
              <HighlightedFilterButton name={filter.name} />
            </button>
          </li>
        ) : (
          <li key={index}>
            <button
              value={filter.completed.toString()}
              onClick={() => handleFilteringTasks(filter.completed)}
            >
              <FilterButton name={filter.name} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
