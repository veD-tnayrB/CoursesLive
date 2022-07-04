import { Router } from 'express';
import { getAll, create, edit, remove } from '../controllers/episode.js';
import { isUserAdminOrTeacher } from '../middlewares/isUserRole.js';

// TEMPORAL
import Episode from '../models/episode.js';

const episodeRouter = Router();

// Get all episodes
episodeRouter.get('/:courseId/episodes/', getAll);

// Create
episodeRouter.post('/:courseId/episodes/create', isUserAdminOrTeacher, create);

// Edit
episodeRouter.patch('/:courseId/episodes/:episodeId/edit', edit);

// Remove
episodeRouter.delete('/:courseId/episodes/:episodeId/delete', remove);

// Like


// Remove Like

// TEMPORAL
// GET ALL EPISODE
episodeRouter.get('/episodes', async (req, res, next) => {
    const episodes = await Episode.find({  });
    return res.status(200).json(episodes);
})


export default episodeRouter;