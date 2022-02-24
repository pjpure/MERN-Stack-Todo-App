import { Router } from 'express';
import { TaskController } from '../controllers';

const router = Router();

router.get('/', TaskController.get);

router.post('/', TaskController.create);

export default router;