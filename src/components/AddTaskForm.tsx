import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TaskContext } from "../lib/context/Tasks";
import { updateLocalStorage, updateTasksAndLocalStorage } from "../lib/utils";

type Inputs = {
  taskName: string;
};

export default function AddTaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm<Inputs>();

  const context = useContext(TaskContext);

  const { tasks, setTasks, setFilteredTasks } = context;

  const addNewTask = (data: Inputs) => {
    const newTask = {
      title: data.taskName,
      completed: false,
      id: crypto.randomUUID(),
    };

    updateTasksAndLocalStorage(setFilteredTasks, setTasks, updateLocalStorage, [
      ...tasks,
      newTask,
    ]);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("test");
    if (!data.taskName) {
      // setting error and displaying error message if there is a submit with empty input field
      setError("taskName", { message: `Field can't be empty!` });
      return;
    }
    addNewTask(data);
    resetField("taskName");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mb-4 md:mb-6  relative"
    >
      <button
        onClick={handleSubmit(onSubmit)}
        className=" absolute top-[52%] left-6 -translate-y-1/2 h-full"
      >
        <div className="inline-flex items-center">
          <div className="bg-l-light-grayish-blue hover:bg-gradient-to-br from-light-blue-gradient to-purple-gradient rounded-full w-[18px] h-[18px] md:w-[26px] md:h-[26px] flex justify-center items-center">
            <label
              className="relative flex items-center md:w-6 md:h-6  rounded-full cursor-pointer z-50 bg-white"
              htmlFor={`customStyle`}
            >
              <input
                className="before:content['']   peer relative w-4 h-4 md:h-6 md:w-6 cursor-pointer  appearance-none rounded-full   transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity  checked:bg-gradient-to-br from-light-blue-gradient to-purple-gradient checked:before:bg-check-gradient hover:before:opacity-0"
                id="customStyle"
                type="checkbox"
                onSubmit={handleSubmit(onSubmit)}
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
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
      </button>
      <input
        {...register("taskName")}
        className="w-full pl-14 md:pl-[70px] pr-10 py-4 rounded-md text-xs md:text-lg font-josefinSans focus-visible:outline-none"
        placeholder="Create a new todo..."
      />

      {errors.taskName && (
        <span className="absolute left-1/3 md:right-1/3  -bottom-4 md:-bottom-7 text-l-very-light-gray text-xs md:text-lg">
          {errors.taskName.message}
        </span>
      )}
    </form>
  );
}
