import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { isUserAdmin, isUser } from '../middlewares/isUserRole.js';
import isBodyAUser from '../dtos/isBodyAUser.js';

const userRouter = Router();

// Get all users
userRouter.get('/', isUserAdmin, userController.getAll);

// Get one
userRouter.get('/user/:id', userController.getOne);

// Edit user info
userRouter.patch('/me/edit', isBodyAUser, isUser, userController.edit);

// Promote the user
userRouter.patch('/edit/range/:userId/:rank', isUserAdmin, userController.editRange);

// Delete the user
userRouter.delete('/:userId/remove', isUserAdmin, userController.remove);

export default userRouter;
