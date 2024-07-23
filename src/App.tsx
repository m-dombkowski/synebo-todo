import { useContext } from "react";
import AddTaskForm from "./components/AddTaskForm";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TopNav from "./components/TopNav";
import { TaskContext } from "./lib/context/Tasks";

function App() {
  const context = useContext(TaskContext);
  const taskList = context?.tasks;

  return (
    <div className="max-w-[1440px] w-full flex justify-center items-center m-auto">
      <Header />
      <div className="md:w-[550px] flex justify-center mt-20 items-center flex-col">
        <TopNav />
        <AddTaskForm />
        <TaskList taskList={taskList} />
      </div>
    </div>
  );
}

export default App;
