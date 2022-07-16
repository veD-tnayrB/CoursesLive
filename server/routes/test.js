import { Router } from 'express';
import { getATest } from '../controllers/test.js';

const testRouter = Router();

// Get a test
testRouter.get('/:episodeId/test/', getATest);

// Add a test

// Edit a test

// Remove a test

export default testRouter;