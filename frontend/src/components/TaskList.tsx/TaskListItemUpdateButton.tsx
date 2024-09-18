import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'

type TaskListItemUpdateButtonProps = {
  task_id: number
}

const TaskListItemUpdateButton: React.FC<TaskListItemUpdateButtonProps> = ({ task_id }) => {
  return (
    <Button className='bg-yellow-500 text-white' asChild>
      <Link href={`/tasks/${task_id}`}>
        Update
      </Link>
    </Button>
  )
}

export default TaskListItemUpdateButton