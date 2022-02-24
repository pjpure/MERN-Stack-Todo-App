import { Router } from 'express';
import { TaskController } from '../controllers';

const router = Router();

router.get('/', TaskController.get);

router.post('/', TaskController.create);

router.put('/:id', TaskController.update);

router.delete('/:id', TaskController.remove);

export default router;