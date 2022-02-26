import { Router } from 'express';
import { TaskController } from '../controllers';

const router = Router();

router.get('/:userId', TaskController.get);

router.post('/:userId', TaskController.create);

router.put('/:id', TaskController.update);

router.delete('/:id', TaskController.remove);

export default router;