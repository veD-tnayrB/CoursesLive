import { Router } from 'express';
import tests from '../controllers/test.controller.js';
import result from '../controllers/result.controller.js';
import isBodyATest from '../dtos/isBodyATest.js';
import { isUser, isUserAdminOrTeacher } from '../middlewares/isUserRole.js';

const testRouter = Router();

// Get a test
testRouter.get('/:episodeId/test/', tests.getOne);

// Add a test
testRouter.post('/:episodeId/test/create', isUserAdminOrTeacher, isBodyATest, tests.create);

// Edit a test
testRouter.patch('/:episodeId/test/:testId/edit', isUserAdminOrTeacher, isBodyATest, tests.edit);

// Remove a test
testRouter.delete('/:episodeId/test/:testId/remove', isUserAdminOrTeacher, tests.remove);

// Save results
testRouter.post('/:testId/save-results', isUser, result.save);

export default testRouter;
