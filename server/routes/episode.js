import { Router } from 'express';
import { getAll, create, edit } from '../controllers/episode.js';
import { isUserAdminOrTeacher } from '../middlewares/isUserRole.js';

const episodeRouter = Router();

// Get all episodes
episodeRouter.get('/:courseId/episodes/', getAll);

// Create
episodeRouter.post('/:courseId/episodes/create', isUserAdminOrTeacher, create);

// Edit
episodeRouter.patch('/:courseId/episodes/:episodeId/edit', edit);

// Remove

// Like

// Remove Like

export default episodeRouter;