import { Router } from 'express';
import { AuthController } from '../controllers';
import auth from '../middlewares/auth';

const router = Router();

router.get('/validate', auth, AuthController.validateToken);
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);


export default router;