// src/actions/tasks/create-task.ts

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
  // Extract form data
  const rawFormData = Object.fromEntries(formData);

  try {
    // Send POST request to the server
    const response = await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawFormData),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    // Handle response, e.g., show success message or redirect
    console.log("Task created successfully");
    revalidateTag("list-tasks");
  } catch (error) {
    // Handle error
    console.error("Error creating task:", error);
  }
}

export async function createServerActionTask(
  prevState: any,
  formData: FormData
) {
  // Extract form data
  const rawFormData = Object.fromEntries(formData);

  try {
    // Send POST request to the server
    const response = await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawFormData),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    // Handle response, e.g., show success message or redirect
    console.log("Task created successfully");
    revalidateTag("list-tasks");
    return "Task created successfully"
  } catch (error) {
    // Handle error
    console.error("Error creating task:", error);
    return "Task created worng"
  }
}
