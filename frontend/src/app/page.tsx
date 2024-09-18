import TaskForm from "@/components/form/TaskForm";
import TaskFormAction from "@/components/form/TaskFormAction";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className='container mx-auto px-6 md:px-0'>
      <div className='max-w-xl mx-auto'>
        <h1 className="text-2xl font-bold mb-4">Create Task</h1>
        <h2 className="text-lg font-bold my-4">Task Form</h2>
        <TaskForm />
        <hr />
        {/* <h2 className="text-lg font-bold my-4">Task Form Action</h2>
        <TaskFormAction /> */}
      </div>
    </div>
  );
};

export default HomePage;
