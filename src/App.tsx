import { useContext, useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TopNav from "./components/TopNav";
import { TaskContext } from "./lib/context/Tasks";
import BottomFilters from "./components/BottomFilters";
import TaskCount from "./components/TaskCount";
import ClearCompletedTasks from "./components/ClearCompletedTasks";
import useWindowDimensions from "./lib/hooks/useWindowDimension";
import { Device, ScreenSizeContext } from "./lib/context/ScreenSize";

export default function App() {
  const context = useContext(TaskContext);
  const { tasks, filteredTasks, setFilteredTasks, setTasks } = context;
  const { width } = useWindowDimensions();
  const [deviceType, setDeviceType] = useState<Device>(Device.NONE);

  useEffect(() => {
    const tasksFromLS = localStorage.getItem("tasks-synebo");
    if (!tasksFromLS) {
      return;
    }
    setFilteredTasks(JSON.parse(tasksFromLS));
    setTasks(JSON.parse(tasksFromLS));
  }, [setFilteredTasks, setTasks]);

  useEffect(() => {
    width < 500 ? setDeviceType(Device.MOBILE) : setDeviceType(Device.DESKTOP);
  }, [width]);

  return (
    <ScreenSizeContext.Provider value={{ deviceType }}>
      <div className="md:max-w-[1440px] w-full flex justify-center items-center m-auto font-josefinSans dark:bg-d-very-dark-desaturated-blue -z-20">
        <Header />
        <div className="w-[325px] sm:w-[550px] flex justify-center mt-[46px] md:mt-20 items-center flex-col z-10">
          <TopNav />
          <AddTaskForm />
          {tasks && <TaskList taskList={tasks} filteredTasks={filteredTasks} />}
          {tasks.length > 0 && (
            <>
              <div className="justify-between items-center flex py-5 w-full px-5 shadow-2xl bg-white rounded-lg ">
                <TaskCount tasks={tasks} />
                {deviceType === "desktop" && <BottomFilters />}

                <ClearCompletedTasks tasks={tasks} />
              </div>
              {deviceType === "mobile" && <BottomFilters />}
              <span className="mt-16 text-l-dark-grayish-blue">
                Drag and drop to reorder list
              </span>
            </>
          )}
        </div>
      </div>
    </ScreenSizeContext.Provider>
  );
}
