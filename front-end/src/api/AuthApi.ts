import httpClient from "../utils/http";

export async function signIn(username: string, password: string): Promise<any> {
    return (await httpClient.post("/users/signin", { username, password })).data;
}


export async function signUp(username: string, password: string): Promise<any> {
    return (await httpClient.post("/users/signup", { username, password })).data;
}

export async function validateUser(token: string): Promise<any> {
    return (await httpClient.get("/users/validate", { headers: { Authorization: `token ${token}` } })).data;
}

