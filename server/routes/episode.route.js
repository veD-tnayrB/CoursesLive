import { Router } from 'express';
import { isUser, isUserAdminOrTeacher } from '../middlewares/isUserRole.js';
import { episodeUploader } from './media.route.js';
import episodes from '../controllers/episode.controller.js';
import isBodyAEpisode from '../dtos/isBodyAEpisode.js';

const episodeRouter = Router();

// Get all episodes
episodeRouter.get('/:courseId/episodes/', episodes.getAll);

// Get episode
episodeRouter.get('/:courseId/episode/:episodeId', episodes.getById);

// Create
episodeRouter.post('/:courseId/:courseFolder/episodes/create', isUserAdminOrTeacher, episodeUploader.fields([{ name: 'video' }, { name: 'miniature' }]), isBodyAEpisode, episodes.create);

// Edit
episodeRouter.patch('/:courseId/:courseFolder/episodes/:episodeId/edit', isUserAdminOrTeacher, episodeUploader.fields([{ name: 'video' }, { name: 'miniature' }]), isBodyAEpisode, episodes.edit);

// Remove
episodeRouter.delete('/:courseId/episodes/:episodeId/delete', isUserAdminOrTeacher, episodes.remove);

// Like
episodeRouter.get('/:courseId/episodes/:episodeId/like', isUser, episodes.like);

// Dislike
episodeRouter.get('/:courseId/episodes/:episodeId/unlike', isUser, episodes.unlike);
export default episodeRouter;
