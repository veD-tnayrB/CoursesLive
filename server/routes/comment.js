import { Router } from 'express';
import { getAll, create } from '../controllers/comment.js';

const commentRouter = Router();

// Get all the comments of a episode
commentRouter.get('/:episodeId/comments/', getAll);

// Create comment
commentRouter.post('/:episodeId/comment/create', create);


export default commentRouter;