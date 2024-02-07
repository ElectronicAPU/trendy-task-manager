import { httpAxios } from "@/helper/httpHelper";

export async function createTask(formData) {
  try {
    const { data } = await httpAxios.post("/api/tasks", formData);
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
}

export async function getAllTasks() {
  try {
    const { data } = await httpAxios.get("/api/tasks");
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to get task");
  }
}
export async function getTaskById(taskId) {
  try {
    const { data } = await httpAxios.post(`/api/tasks/${taskId}`, taskId);
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to get task");
  }
}
export async function updateTask(formData, taskId) {
  try {
    const { data } = await httpAxios.put(`/api/tasks/${taskId}/edit`, formData);
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to get task");
  }
}

export async function deleteTask(taskId) {
  try {
    const { data } = await httpAxios.delete(`/api/tasks/${taskId}`);
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to get task");
  }
}
