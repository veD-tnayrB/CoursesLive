import { Router } from 'express';
import { getAll, edit, editRange, remove } from '../controllers/user.js'
import isBodyAUser from '../dtos/';
import { isUserAdmin } from '../middlewares/isUserRole.js';

const userRouter = Router();

// Get all users
userRouter.get('/', isUserAdmin, getAll);

// Edit user info
userRouter.patch('/me/edit', isBodyAUser, edit);

// Promote the user
userRouter.patch('/edit/range/:userId/:rank', isUserAdmin, editRange);

// Delete the user
userRouter.delete('/:userId/remove', isUserAdmin, remove);


export default userRouter;