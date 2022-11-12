import { Router } from 'express';
import tests from '../controllers/test.controller.js';
import isBodyATest from '../dtos/isBodyATest.js';
import { isUserAdminOrTeacher } from '../middlewares/isUserRole.js';

const testRouter = Router();

// Get a test
testRouter.get('/:episodeId/test/', tests.getOne);

// Add a test
testRouter.post('/:episodeId/test/create', isUserAdminOrTeacher, isBodyATest, tests.create);

// Edit a test
testRouter.patch('/:episodeId/test/:testId/edit', isUserAdminOrTeacher, isBodyATest, tests.edit);

// Remove a test
testRouter.delete('/:episodeId/test/:testId/remove', isUserAdminOrTeacher, tests.remove);

export default testRouter;
