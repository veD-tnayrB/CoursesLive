import { Router } from 'express';
import multer from 'multer';
import episodes from '../controllers/episode.controller.js';
import { isUser, isUserAdminOrTeacher } from '../middlewares/isUserRole.js';
import isBodyAEpisode from '../dtos/isBodyAEpisode.js';

const episodeRouter = Router();

const filesStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'storage/videos');
	},

	filename: (req, file, cb) => {
		const fileName = Date.now() + '-' + file.originalname.split(' ').join('-');
		cb(null, fileName);
	},
});

export const videoUploader = multer({ storage: filesStorage, dest: 'storage/videos' });

// Get all episodes
episodeRouter.get('/:courseId/episodes/', episodes.getAll);

// Get episode
episodeRouter.get('/:courseId/episode/:episodeId', episodes.getById);

// Create
episodeRouter.post(
	'/:courseId/episodes/create',
	isUserAdminOrTeacher,
	videoUploader.single('video'),
	isBodyAEpisode,
	episodes.create
);

// Edit
episodeRouter.patch('/:courseId/episodes/:episodeId/edit', isUserAdminOrTeacher, isBodyAEpisode, episodes.edit);

// Remove
episodeRouter.delete('/:courseId/episodes/:episodeId/delete', isUserAdminOrTeacher, episodes.remove);

// Like
episodeRouter.get('/:courseId/episodes/:episodeId/like', isUser, episodes.like);

// Dislike
episodeRouter.get('/:courseId/episodes/:episodeId/unlike', isUser, episodes.unlike);
export default episodeRouter;
