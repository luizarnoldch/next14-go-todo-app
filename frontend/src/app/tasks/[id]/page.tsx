import { getTaskById } from '@/actions/tasks/get-task-by-id'
import TaskForm from '@/components/form/TaskForm'
import React from 'react'

type TaskUpdateProps = {
  params: { id: string }
}

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const TaskUpdate: React.FC<TaskUpdateProps> = async ({ params }) => {

  // Fetch tasks data from the server-side
  const { data: task, status } = await getTaskById(params.id);

  if (status !== 'success') {
    return <div>Error loading tasks</div>;
  }

  return (
    <div className='container mx-auto px-6 md:px-0'>
      <div className='max-w-xl mx-auto'>
        <h1 className="text-2xl font-bold mb-4">Create Task</h1>
        <h2 className="text-lg font-bold my-4">Task Form</h2>
        <TaskForm task={task as Task} />
      </div>
    </div>
  )
}

export default TaskUpdate