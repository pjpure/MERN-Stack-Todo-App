import { Router } from 'express';
import TasksRouter from './task.route';

const router: Router = Router();

router.use('/tasks', TasksRouter);

export default router;