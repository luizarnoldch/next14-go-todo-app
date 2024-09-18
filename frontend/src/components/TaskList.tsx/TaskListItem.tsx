import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import TaskListItemDeleteButton from './TaskListItemDeleteButton';
import TaskListItemUpdateButton from './TaskListItemUpdateButton';

// Define Task type
type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type TaskListItemProps = {
  task: Task
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  return (
    <Card className="border p-4 rounded-lg shadow-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">{task.title}: {task.id}</h3>
      </CardHeader>
      <CardContent className='h-24'>
        <p className="text-sm">{task.description}</p>
        <p className="text-sm">{`Status: ${task.status}`}</p>
      </CardContent>
      <CardFooter className='w-full flex flex-col gap-4 h-24'>
        <div className='flex flex-col w-full justify-start items-start gap-2'>
          <p className="text-xs">{`Created: ${new Date(task.created_at).toLocaleDateString()}`}</p>
          <p className="text-xs">{`Updated: ${new Date(task.updated_at).toLocaleDateString()}`}</p>
        </div>
        <div className='w-full flex justify-between items-center'>
          <TaskListItemDeleteButton task_id={task.id} />
          <TaskListItemUpdateButton task_id={task.id} />
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskListItem