"use server";

import { revalidateTag } from "next/cache";

export async function updateTask(formData: FormData) {
  // Extract form data
  const rawFormData = Object.fromEntries(formData);

  // Ensure task ID is a number
  const taskId = parseInt(rawFormData.id as string, 10);

  if (isNaN(taskId)) {
    console.error("Invalid task ID");
    return;
  }

  // Create updated task object with properly typed values
  const updatedTask = {
    title: rawFormData.title as string,
    description: rawFormData.description as string,
    status: rawFormData.status as string,
  };

  try {
    // Send PUT request to the server
    const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask), // Use updatedTask instead of rawFormData
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    console.log("Task updated successfully");
    revalidateTag("list-tasks"); // Fixed typo from "list-ttasks" to "list-tasks"
  } catch (error) {
    // Handle error
    console.error("Error updating task:", error);
  }
}
