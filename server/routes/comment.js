import { Router } from 'express';
import { getAll, create, remove } from '../controllers/comment.js';

const commentRouter = Router();

// Get all the comments of a episode
commentRouter.get('/:episodeId/comments/', getAll);

// Create comment
commentRouter.post('/:episodeId/comment/create', create);

// Delete comment
commentRouter.delete('/:episodeId/comment/:commentId/remove', remove);

export default commentRouter;