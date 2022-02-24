import { Request, Response } from 'express';
import { TaskService } from '../services';

async function get(req: Request, res: Response) {
    let status: boolean = (req.query.taskStatus === 'true');
    const result = await TaskService.get(status);
    return res.status(200).send(result);
}

async function create(req: Request, res: Response) {
    const result = await TaskService.create(req.body)
    return res.status(201).send(result);
}

export default {
    get,
    create
}