import { Router } from 'express';
import { getAll, edit, remove } from '../controllers/user.js'
import isBodyAUser from '../middlewares/isBodyAUser.js'
import { isUserAdmin } from '../middlewares/isUserRole.js';

const userRouter = Router();

// Get all users
userRouter.get('/', getAll);

// Edit user info
userRouter.patch('/me/edit', isBodyAUser, edit);

// Delete the user
userRouter.delete('/delete/:userId', isUserAdmin, remove);


export default userRouter;