import { Router } from 'express';
import courses from '../controllers/course.controller.js';
import { isUser, isUserAdminOrTeacher } from '../middlewares/isUserRole.js';
import isBodyACourse from '../dtos/isBodyACourse.js';

const courseRouter = Router();

// Get all the courses
courseRouter.get('/', courses.getAll);

// Get just one course
courseRouter.get('/course/:courseId', courses.getById);

// Create
courseRouter.post('/create', isUserAdminOrTeacher, isBodyACourse, courses.create);

// Edit
courseRouter.patch('/:courseId/edit', isUserAdminOrTeacher, isBodyACourse, courses.edit);

// Remove
courseRouter.delete('/:courseId/remove', isUserAdminOrTeacher, courses.remove);

// Suscribe
courseRouter.patch('/:courseId/suscribe', isUser, courses.suscribe);

// Unsuscribe
courseRouter.patch('/:courseId/unsuscribe', isUser, courses.unsuscribe);

export default courseRouter;
