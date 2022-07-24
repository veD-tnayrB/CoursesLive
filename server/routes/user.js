import { Router } from 'express';
import { getAll, edit, editRange, remove } from '../controllers/user.js'
import { isUserAdmin, isUser } from '../middlewares/isUserRole.js';
import isBodyAUser from '../dtos/isBodyAUser.js';

const userRouter = Router();

// Get all users
userRouter.get('/', isUserAdmin, getAll);

// Edit user info
userRouter.patch('/me/edit', isBodyAUser, isUser, edit);

// Promote the user
userRouter.patch('/edit/range/:userId/:rank', isUserAdmin, editRange);

// Delete the user
userRouter.delete('/:userId/remove', isUserAdmin, remove);


export default userRouter;