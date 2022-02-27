import { Router } from 'express';
import TaskRouter from './task.route';
import AuthRouter from './auth.route';
import auth from '../middlewares/auth';

const router: Router = Router();

router.use('/tasks', auth, TaskRouter);
router.use('/users', AuthRouter);

export default router;