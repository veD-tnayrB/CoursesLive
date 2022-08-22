import { Router } from 'express';
import { getAll, filterByTag, create, edit, remove, suscribe, unsuscribe } from '../controllers/course.js';
import { isUser, isUserAdminOrTeacher } from '../middlewares/isUserRole.js';
import isBodyACourse from '../dtos/isBodyACourse.js';
// 6302fc9154bd831cf4d0ae0d id and token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDJmYzkxNTRiZDgzMWNmNGQwYWUwZCIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNjYxMTQwMTE0fQ.yFI8Qqt8gwUK-VszN-88Da4HbqgmyWpncgBUH_1C_F4
const courseRouter = Router();

// Get all the courses
courseRouter.get('/', getAll);

// Filter by tag
courseRouter.get('/filter', filterByTag);

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