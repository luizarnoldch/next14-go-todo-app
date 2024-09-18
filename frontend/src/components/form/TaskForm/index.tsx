"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useRef } from 'react';

import { createTask } from "@/actions/tasks/create-task"
import TaskFormSubmitButton from './TaskFormSubmitButton';
import TaskFormUpdateButton from './TaskFormUpdateButton';
import { updateTask } from '@/actions/tasks/update-task';

import { useRouter } from 'next/navigation'

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type TaskFormProps = {
  task?: Task;
};

const TaskForm: React.FC<TaskFormProps> = ({ task }) => {

  const router = useRouter()
  // Create a reference for the form
  const formTaskRef = useRef<HTMLFormElement>(null);

  // Function to handle form reset after submission
  const handleSubmit = async (formData: FormData) => {
    try {
      // Call the createTask action and pass the form data
      await createTask(formData);

      // Reset the form fields after successful submission
      if (formTaskRef.current) {
        formTaskRef.current.reset();
      }
      router.push('/tasks')
    } catch (error) {
      console.error('Failed to submit task:', error);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      // Call the updateTask action and pass the form data
      await updateTask(formData);

      // Reset the form fields after successful submission
      if (formTaskRef.current) {
        formTaskRef.current.reset();
      }
      router.push('/tasks')
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <form ref={formTaskRef} className="space-y-4 w-full max-w-xl mx-auto">
      {task?.id && <Input name="id" type="hidden" defaultValue={task?.id} />}

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
          defaultValue={task?.title || ""}
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
          defaultValue={task?.description || ""}
        />
      </div>

      <div>
        <Label htmlFor="status" className="block text-sm font-medium ">
          Status
        </Label>
        <Select
          name="status"
          required
          defaultValue={task?.status || ""}
        >
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

      {task
        ? <TaskFormUpdateButton action={handleUpdate} />
        : <TaskFormSubmitButton action={handleSubmit} />
      }
    </form>
  );
};

export default TaskForm;
