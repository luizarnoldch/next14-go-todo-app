import { Button } from '@/components/ui/button'
import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'


type TaskFormSubmitButtonProps = {
  isSubmmiting?: boolean
}

const TaskFormSubmitButtonAction: React.FC<TaskFormSubmitButtonProps> = ({ isSubmmiting }) => {
  return (
    <Button type="submit" className="mt-4" disabled={isSubmmiting}>
      {isSubmmiting ? <div className=' animate-spin'>
        <LoaderCircleIcon />
      </div> : <div>Submit</div>}
    </Button>
  )
}

export default TaskFormSubmitButtonAction