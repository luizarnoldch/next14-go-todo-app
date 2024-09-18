"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { deleteTask } from "@/actions/tasks/delete-task";

type TaskListItemDeleteButtonProps = {
  task_id: number;
};

const TaskListItemDeleteButton: React.FC<TaskListItemDeleteButtonProps> = ({ task_id }) => {
  return (
    <form action={deleteTask} className="">
      <Input type="hidden" name="task_id" value={task_id.toString()} />
      <Button type="submit" className="bg-red-500 text-white">
        Delete
      </Button>
    </form>
  );
};

export default TaskListItemDeleteButton;
