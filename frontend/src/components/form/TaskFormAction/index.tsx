"use client"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useActionState } from 'react';

import { createServerActionTask } from "@/actions/tasks/create-task"
import TaskFormSubmitButtonAction from './TaskFormSubmitButtonAction';

type Props = {}

const TaskFormAction = (props: Props) => {
  // Create a reference for the form

  // Only for React 19
  const [state, formTaskAction, isSubmmiting] = useActionState(createServerActionTask, null)

  return (
    <form action={formTaskAction} className="space-y-4">
      <div>
        <Label htmlFor="title" className="block text-sm font-medium ">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          type="text"
          required
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <Label htmlFor="description" className="block text-sm font-medium ">
          Description
        </Label>
        <Input
          id="description"
          name="description"
          type="text"
          required
          className="mt-1 block w-full"
        />
      </div>
      <div>
        <Label htmlFor="status" className="block text-sm font-medium ">
          Status
        </Label>
        <Select name="status" required>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <TaskFormSubmitButtonAction isSubmmiting={isSubmmiting} />
      {isSubmmiting && <p>Loading...</p>}
      {state && <div className='text-red-500'>Error: {state}</div>}
    </form>
  );
};

export default TaskFormAction;
