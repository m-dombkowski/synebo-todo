import { useContext, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TopNav from "./components/TopNav";
import { TaskContext } from "./lib/context/Tasks";
import BottomFilters from "./components/BottomFilters";
import TaskCount from "./components/TaskCount";
import ClearCompletedTasks from "./components/ClearCompletedTasks";

export default function App() {
  const context = useContext(TaskContext);
  const { tasks, filteredTasks, setFilteredTasks, setTasks } = context;

  useEffect(() => {
    const tasksFromLS = localStorage.getItem("tasks-synebo");
    if (tasksFromLS) {
      setFilteredTasks(JSON.parse(tasksFromLS));
      setTasks(JSON.parse(tasksFromLS));
    }
    return;
  }, [setFilteredTasks, setTasks]);

  return (
    <div className="max-w-[1440px] w-full flex justify-center items-center m-auto font-josefinSans">
      <Header />
      <div className="md:w-[550px] flex justify-center mt-20 items-center flex-col">
        <TopNav />
        <AddTaskForm />
        {tasks && <TaskList taskList={tasks} filteredTasks={filteredTasks} />}
        {tasks.length > 0 && (
          <>
            <div className="justify-between items-center flex py-5 w-full px-5 shadow-2xl bg-white rounded-t-lg">
              <TaskCount tasks={tasks} />
              <BottomFilters />
              <ClearCompletedTasks tasks={tasks} />
            </div>
            <span className="mt-16 text-l-dark-grayish-blue">
              Drag and drop to reorder list
            </span>
          </>
        )}
      </div>
    </div>
  );
}
