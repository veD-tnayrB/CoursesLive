import { Router } from 'express';
import { getAll, edit } from '../controllers/user.js'
import isBodyAUser from '../middlewares/isBodyAUser.js'

const userRouter = Router();

// Get all users
userRouter.get('/', getAll);

// Edit user info
userRouter.patch('/me/edit', isBodyAUser, edit);


export default userRouter;