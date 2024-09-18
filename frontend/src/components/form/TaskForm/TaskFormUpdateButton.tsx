"use client"

import { Button } from '@/components/ui/button'
import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'

import { useFormStatus } from 'react-dom'

type TaskFormUpdateButtonProps = {
  action: (formData: FormData) => Promise<void>
}

const TaskFormUpdateButton: React.FC<TaskFormUpdateButtonProps> = ({ action }) => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="mt-4" disabled={pending} formAction={action}>
      {pending ? <LoaderCircleIcon className='animate-spin' /> : <p>Update</p>}
    </Button>
  )
}

export default TaskFormUpdateButton