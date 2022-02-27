export type Task = {
    _id: string,
    taskName: string,
    taskDescription: string,
    taskStatus: boolean,
    created_at: string,

}

export type User = {
    id: string,
    username: string,
    password?: string,
    token?: string,
}