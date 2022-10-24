import { Router } from 'express';
import { getAll, getEpisode, create, edit, like, dislike, remove } from '../controllers/episode.js';
import { isUserAdminOrTeacher } from '../middlewares/isUserRole.js';
import isBodyAEpisode from '../dtos/isBodyAEpisode.js';

// TEMPORAL
import Episode from '../models/episode.js';
import { videoUploader } from './videos.js';

const episodeRouter = Router();

// Get all episodes
episodeRouter.get('/:courseId/episodes/', getAll);

// Get episode
episodeRouter.get('/:courseId/episode/:episodeId', getEpisode);

// Create
episodeRouter.post('/:courseId/episodes/create', isUserAdminOrTeacher, isBodyAEpisode, create);

// Edit
episodeRouter.patch('/:courseId/episodes/:episodeId/edit', isUserAdminOrTeacher, isBodyAEpisode, edit);

// Remove
episodeRouter.delete('/:courseId/episodes/:episodeId/delete', isUserAdminOrTeacher, remove);

// Like
episodeRouter.patch('/:courseId/episodes/:episodeId/like', like);

// Dislike
episodeRouter.patch('/:courseId/episodes/:episodeId/dislike', dislike);


// TEMPORAL
// GET ALL EPISODES
episodeRouter.get('/episodes', async (req, res, next) => {
    const episodes = await Episode.find({  });
    return res.status(200).json(episodes);
})


export default episodeRouter;