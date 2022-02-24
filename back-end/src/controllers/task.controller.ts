import { Request, Response } from 'express';

function get(req: Request, res: Response) {
    res.send('Hello world');
}

export default {
    get
}