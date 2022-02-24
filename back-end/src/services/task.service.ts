import { TaskModel } from "../models";

async function get(taskStatus: boolean) {
    return await TaskModel.find({ taskStatus: taskStatus });
}

function create(data: any) {
    const task = new TaskModel(data);
    return task.save();
}

export default {
    get,
    create
}