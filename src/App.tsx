import { useContext } from "react";
import AddTaskForm from "./components/AddTaskForm";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TopNav from "./components/TopNav";
import { TaskContext } from "./lib/context/Tasks";
import BottomFilters from "./components/BottomFilters";

function App() {
  const context = useContext(TaskContext);

  if (!context) return;
  const { tasks, filteredTasks } = context;

  return (
    <div className="max-w-[1440px] w-full flex justify-center items-center m-auto">
      <Header />
      <div className="md:w-[550px] flex justify-center mt-20 items-center flex-col">
        <TopNav />
        <AddTaskForm />
        {tasks && <TaskList taskList={tasks} filteredTasks={filteredTasks} />}
        <BottomFilters />
      </div>
    </div>
  );
}

export default App;
