import { Router } from 'express';
import { getAll, create, edit, remove, suscribe, unsuscribe } from '../controllers/course.js';
import { isUserAdminOrTeacher } from '../middlewares/isUserRole.js';

const courseRouter = Router();

// Get all the courses
courseRouter.get('/', getAll);

// Create
courseRouter.post('/create', isUserAdminOrTeacher, create);

// Update
courseRouter.patch('/:courseId/edit', isUserAdminOrTeacher, edit);

// Remove
courseRouter.delete('/:courseId/remove', isUserAdminOrTeacher, remove);

// Suscribe
courseRouter.patch('/:courseId/suscribe', suscribe);

// Unsuscribe
courseRouter.patch('/:courseId/unsuscribe', unsuscribe);

export default courseRouter;