"use server";

import { revalidateTag } from "next/cache";

export async function deleteTask(formData: FormData) {
  // Extract form data
  const rawFormData = Object.fromEntries(formData);
  const taskId = rawFormData.task_id as string;

  try {
    // Send DELETE request to the server
    const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    // Handle response, e.g., show success message or redirect
    console.log("Task deleted successfully");

    // Revalidate the list of tasks after deletion
    revalidateTag("list-tasks");
  } catch (error) {
    // Handle error
    console.error("Error deleting task:", error);
  }
}
