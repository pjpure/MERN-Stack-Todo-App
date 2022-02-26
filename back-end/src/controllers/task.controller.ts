import { Request, Response } from 'express';
import { TaskModel, UserModel } from "../models";

async function get(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId).populate('tasks');
        return res.send(user.tasks);
    } catch (err: any) {
        return res.status(500).send({
            message: err.message,
            error: err
        });
    }
}

async function create(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const task = req.body;
        let newTask = await TaskModel.create({
            ...task, user: userId
        });

        newTask = await newTask.save();

        const userById = await UserModel.findById(userId);
        userById.tasks.push(newTask);
        await userById.save();

        return res.status(200).send(newTask)
    } catch (err: any) {
        return res.status(500).send({
            message: err.message,
            error: err
        });
    }

}

async function update(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const task = req.body;
        const taskUpdated = await TaskModel.findByIdAndUpdate(id, task, { new: true });
        return res.status(200).send(taskUpdated)
    } catch (err: any) {
        return res.status(500).send({
            message: err.message,
            error: err
        });
    }

}

async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id
        const result = await TaskModel.findByIdAndDelete(id)
        return res.status(200).send(result)
    } catch (err: any) {
        return res.status(500).send({
            message: err.message,
            error: err
        });
    }

}

export default {
    get,
    create,
    update,
    remove
}