import { getAllTasks } from '@/actions/tasks/get-all-tasks';
import TaskListItem from './TaskListItem';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

// Server-side data fetching and rendering
const TaskList = async () => {
  // Fetch tasks data from the server-side
  const { data: tasks, status } = await getAllTasks();

  if (status !== 'success') {
    return <div>Error loading tasks</div>;
  }

  // Ensure tasks is an array or empty array if no tasks are found
  const taskList = tasks || [];

  // Check if there are no tasks available
  if (taskList.length === 0) {
    return <div>No tasks available</div>;
  }

  console.log("fetching tasks on the UI")

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {tasks.map((task: Task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
