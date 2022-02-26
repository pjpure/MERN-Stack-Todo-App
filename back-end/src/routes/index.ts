import { Router } from 'express';
import TaskRouter from './task.route';
import AuthRouter from './auth.route';

const router: Router = Router();

router.use('/tasks', TaskRouter);
router.use('/users', AuthRouter);

export default router;