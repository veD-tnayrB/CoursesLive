import { Router } from 'express';
import { getAll, create, edit, remove } from '../controllers/comment.js';
import { isUser } from '../middlewares/isUserRole.js';

const commentRouter = Router();

// Get all the comments of a episode
commentRouter.get('/:episodeId/comments/', getAll);

// Create comment
commentRouter.post('/:episodeId/comment/create', isUser, create);

// Edit comment
commentRouter.patch('/:episodeId/comment/:commentId/edit', isUser, edit);

// Remove comment
commentRouter.delete('/:episodeId/comment/:commentId/remove', isUser, remove);

export default commentRouter;
