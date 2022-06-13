import { Router } from 'express';
import isBodyAUser from '../middlewares/isBodyAUser.js';
import isTokenValid from '../middlewares/isTokenValid.js';
import { login, signup } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/login', isBodyAUser, login);

authRouter.post('/signup', isBodyAUser, signup);

export default authRouter;