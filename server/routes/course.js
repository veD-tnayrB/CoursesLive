import { Router } from 'express';
import { getAll, getOne, create, edit, remove, suscribe, unsuscribe } from '../controllers/course.js';
import { isUser, isUserAdminOrTeacher } from '../middlewares/isUserRole.js';
import isBodyACourse from '../dtos/isBodyACourse.js';

const courseRouter = Router();

// Get all the courses
courseRouter.get('/', getAll);

// Get just one course
courseRouter.get('/course/:courseId', getOne);

// Create
courseRouter.post('/create', isUserAdminOrTeacher, isBodyACourse, create);

// Edit
courseRouter.patch('/:courseId/edit', isUserAdminOrTeacher, isBodyACourse, edit);

// Remove
courseRouter.delete('/:courseId/remove', isUserAdminOrTeacher, remove);

// Suscribe
courseRouter.patch('/:courseId/suscribe', isUser, suscribe);

// Unsuscribe
courseRouter.patch('/:courseId/unsuscribe', isUser, unsuscribe);

export default courseRouter;