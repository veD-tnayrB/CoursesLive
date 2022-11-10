import { Router } from 'express';
import comments from '../controllers/comment.controller.js';
import { isUser } from '../middlewares/isUserRole.js';

const commentRouter = Router();

// Get all the comments of a episode
commentRouter.get('/:episodeId/comments/', comments.getAll);

// Create comment
commentRouter.post('/:episodeId/comment/create', isUser, comments.create);

// Edit comment
commentRouter.patch('/:episodeId/comment/:commentId/edit', isUser, comments.edit);

// Remove comment
commentRouter.delete('/:episodeId/comment/:commentId/remove', isUser, comments.remove);

export default commentRouter;
