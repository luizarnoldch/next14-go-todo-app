// src/actions/tasks/get-all-tasks.ts

'use server'

export async function getAllTasks() {
  try {
    const response = await fetch('http://localhost:4000/tasks', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: "no-store",
      next: { tags: ['list-tasks'] }
    },);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("Tasks retrieved successfully");
    return data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return { data: [], message: 'Failed to fetch tasks', status: 'error' };
  }
}
