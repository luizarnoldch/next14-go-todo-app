import TaskForm from '@/components/form/TaskForm'
import TaskFormAction from '@/components/form/TaskFormAction'
import TaskList from '@/components/TaskList.tsx'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='container mx-auto px-6 md:px-0'>
      <div className='mx-auto flex flex-col'>
        <h2 className="text-lg font-bold my-4">Task Form</h2>
        <TaskForm />
        <hr className='my-4'/>
        {/* <h2 className="text-lg font-bold my-4">Task Form Action</h2>
        <TaskFormAction /> */}
        <TaskList />
      </div>
    </div>
  )
}

export default page