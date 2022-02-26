import httpClient from "../utils/http";

export async function getTask(): Promise<any> {
  return (await httpClient.get("/tasks")).data;
}

export async function createTask(task: any): Promise<any> {
  return (await httpClient.post("/tasks", task)).data;
}

export async function updateTask(id: string, task: any): Promise<any> {
  return await httpClient.put(`/tasks/${id}`, task);
}

export async function deleteTask1(id: string): Promise<any> {
  return await httpClient.delete(`/tasks/${id}`);
}
