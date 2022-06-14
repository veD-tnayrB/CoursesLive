import { Router } from 'mongoose';
import { getAll } from '../controllers/course.js';

const courseRouter = Router();

// Get all the courses
courseRouter.get('/', getAll);

// Suscribe
courseRouter.patch('/suscribe/:courseId', suscribe);

// Unsuscribe
courseRouter.patch('/unsuscribe/:courseId', unsuscribe)

export default courseRouter;