import { Router } from 'mongoose';
import { getAll, create, suscribe, unsuscribe } from '../controllers/course.js';
import { isUserAdminOrTeacher } from '../middlewares/isUser.js';

const courseRouter = Router();

// Get all the courses
courseRouter.get('/', getAll);

// Create
courseRouter.post('/new', isUserAdminOrTeacher, create);

// Suscribe
courseRouter.patch('/suscribe/:courseId', suscribe);

// Unsuscribe
courseRouter.patch('/unsuscribe/:courseId', unsuscribe);

export default courseRouter;