import { TaskModel } from "../models";

async function get(taskStatus: boolean) {
    return await TaskModel.find({ taskStatus: taskStatus });
}

function create(data: any) {
    const task = new TaskModel(data);
    return task.save();
}

async function update(id: string, data: any) {
    return await TaskModel.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id: string) {
    return await TaskModel.findByIdAndDelete(id);
}

export default {
    get,
    create,
    update,
    remove
}