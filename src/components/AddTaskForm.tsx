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
    if (!data.taskName) {
      // setting error and displaying error message if there is a submit with empty input field
      setError("taskName", { message: `Field can't be empty!` });
      return;
    }
    addNewTask(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-10 relative">
      <input
        {...register("taskName")}
        className="w-full pl-20 pr-10 py-4 rounded-md text-lg font-josefinSans"
        placeholder="Create a new todo..."
      />
      {errors.taskName && (
        <span className="absolute left-1/3 right-1/3 -bottom-8 text-l-very-light-gray">
          {errors.taskName.message}
        </span>
      )}
    </form>
  );
}
