import { TaskModel } from "../models";

async function get(taskStatus: boolean) {
    return await TaskModel.find({ taskStatus: taskStatus });
}