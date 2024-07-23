import AddTaskForm from "./components/AddTaskForm";
import Header from "./components/Header";
import TopNav from "./components/TopNav";
function App() {
  return (
    <div className="max-w-[1440px] w-full flex justify-center items-center m-auto">
      <Header />
      <div className="md:w-[550px] flex justify-center mt-20 items-center flex-col">
        <TopNav />
        <AddTaskForm />
      </div>
    </div>
  );
}

export default App;
