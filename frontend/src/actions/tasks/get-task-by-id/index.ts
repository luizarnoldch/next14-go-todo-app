// src/actions/tasks/get-task-by-id.ts

"use server";

export async function getTaskById(taskId: string) {
  try {
    const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(`Task ${taskId} retrieved successfully`);
    return data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return { data: [], message: "Failed to fetch tasks", status: "error" };
  }
}
