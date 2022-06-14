import { Router } from 'express';
import isBodyAUser from '../middlewares/isBodyAUser.js';
import { login, signup } from '../controllers/auth.js';

const authRouter = Router();

// Log the user
authRouter.post('/login', isBodyAUser, login);

// Register the user
authRouter.post('/signup', isBodyAUser, signup);



export default authRouter;