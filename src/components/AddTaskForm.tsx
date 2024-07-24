/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TaskContext } from "../lib/context/Tasks";

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
  if (!context) {
    throw new Error("This Component must by used within a TaskProvider");
  }

  const { tasks, setTasks, filteredTasks, setFilteredTasks } = context;

  const addNewTask = (data: Inputs) => {
    const newTask = {
      title: data.taskName,
      completed: false,
      id: crypto.randomUUID(),
    };
    setTasks([...tasks, newTask]);
    setFilteredTasks([...tasks, newTask]);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.taskName) {
      // setting error and displaying error message if there is a submit with empty input field
      setError("taskName", { message: `Field can't be empty` });
      return;
    }
    addNewTask(data);

    console.log(tasks, filteredTasks);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-6">
      <input
        {...register("taskName")}
        className="w-full pl-20 pr-10 py-4 rounded-md text-lg"
        placeholder="Create a new todo..."
      />
      {errors.taskName && <span>{errors.taskName.message}</span>}
    </form>
  );
}
