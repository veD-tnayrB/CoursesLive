import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import courses from '../controllers/course.controller.js';
import { isUser, isUserAdminOrTeacher } from '../middlewares/isUserRole.js';
import isBodyACourse from '../dtos/isBodyACourse.js';

const imageStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const courseName = `${Date.now()}--${req.body.name.split(' ').join('-')}`;
		const existingCourseFolder = req.params.courseFolder;
		const courseFolder = existingCourseFolder ? `storage/courses-content/${existingCourseFolder}` : `storage/courses-content/${courseName}`;

		if (!existingCourseFolder) {
			fs.mkdirSync(courseFolder);
		}

		req.courseFolder = existingCourseFolder ? existingCourseFolder : courseName;
		cb(null, courseFolder);
	},

	filename: (req, file, cb) => {
		const fileName = Date.now() + '-' + file.originalname.split(' ').join('-');
		cb(null, fileName);
	},
});

export const miniatureUploader = multer({ storage: imageStorage, dest: 'storage/courses-content' });

const courseRouter = Router();

// Get all the courses
courseRouter.get('/', courses.getAll);

// Get just one course
courseRouter.get('/course/:courseId', courses.getById);

// Create
courseRouter.post('/create', isUserAdminOrTeacher, miniatureUploader.single('cover'), isBodyACourse, courses.create);

// Edit
courseRouter.patch('/:courseId/:courseFolder/edit', isUserAdminOrTeacher, miniatureUploader.single('cover'), isBodyACourse, courses.edit);

// Remove
courseRouter.delete('/:courseId/remove', isUserAdminOrTeacher, courses.remove);

// Suscribe
courseRouter.patch('/:courseId/suscribe', isUser, courses.suscribe);

// Unsuscribe
courseRouter.patch('/:courseId/unsuscribe', isUser, courses.unsuscribe);

export default courseRouter;
