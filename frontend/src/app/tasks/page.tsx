import TaskList from '@/components/TaskList.tsx';
import { Suspense } from 'react';

// Server-side data fetching and rendering
const TasksPage = async () => {
  return (
    <div className='container mx-auto px-6 md:px-0'>
      <Suspense fallback={<div>Loading...</div>}>
        <TaskList />
      </Suspense>
    </div>
  );
};

export default TasksPage;
