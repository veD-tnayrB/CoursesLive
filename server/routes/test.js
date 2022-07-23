import { Router } from 'express';
import { create, edit, getATest, remove } from '../controllers/test.js';
import isBodyATest from '../dtos/isBodyATest.js';

const testRouter = Router();

// Get a test
testRouter.get('/:episodeId/test/', getATest);

// Add a test
testRouter.post('/:episodeId/test/create', isBodyATest, create);

// Edit a test
testRouter.patch('/:episodeId/test/:testId/edit', isBodyATest, edit);

// Remove a test
testRouter.delete('/:episodeId/test/:testId/remove', remove);

export default testRouter;