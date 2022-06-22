import { Router } from 'express';
import { getAll } from '../controllers/user.js'

const userRouter = Router();

userRouter.get('/', getAll);


export default userRouter;