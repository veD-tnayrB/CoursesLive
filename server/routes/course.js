import { Router } from 'express';
import { getAll, create, remove, suscribe, unsuscribe } from '../controllers/course.js';
import { isUserAdminOrTeacher } from '../middlewares/isUserRole.js';

const courseRouter = Router();

// Get all the courses
courseRouter.get('/', getAll);

// Create
courseRouter.post('/new', isUserAdminOrTeacher, create);

// Remove
courseRouter.delete('/remove/:id', isUserAdminOrTeacher, remove);

// Suscribe
courseRouter.patch('/suscribe/:courseId', suscribe);

// Unsuscribe
courseRouter.patch('/unsuscribe/:courseId', unsuscribe);

export default courseRouter;