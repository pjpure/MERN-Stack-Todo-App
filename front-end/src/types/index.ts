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
    token: string,
}