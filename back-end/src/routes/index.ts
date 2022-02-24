import { Router } from 'express';
import TaskRouter from './task.route';

const router: Router = Router();

router.use('/tasks', TaskRouter);

export default router;