import httpClient from "../utils/http";

export async function getTask(): Promise<any> {
  return (await httpClient.get("/tasks")).data;
}
