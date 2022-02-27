import httpClient from "../utils/http";
import { Task } from "../types";

export async function getTask(userId: string, token: string): Promise<Task[]> {
  return (await httpClient.get(`/tasks/${userId}`, {
    headers: { Authorization: `token ${token}` }
  })).data;
}

export async function createTask(userId: string, task: Omit<Task, '_id' | 'taskStatus' | 'created_at'>, token: string): Promise<any> {
  return (await httpClient.post(`/tasks/${userId}`, task, {
    headers: { Authorization: `token ${token}` }
  })).data;
}

export async function updateTask(id: string, task: any, token: string): Promise<any> {
  return await httpClient.put(`/tasks/${id}`, task, {
    headers: { Authorization: `token ${token}` }
  });
}

export async function removeTask(id: string, token: string): Promise<any> {
  return await httpClient.delete(`/tasks/${id}`, {
    headers: { Authorization: `token ${token}` }
  });
}
