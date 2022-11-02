import { Router } from 'express';
import expressBusboy from 'express-busboy';
import multer from "multer";
import { getAll, getEpisode, create, edit, like, dislike, remove } from '../controllers/episode.js';
import { isUserAdminOrTeacher } from '../middlewares/isUserRole.js';
import isBodyAEpisode from '../dtos/isBodyAEpisode.js';

// TEMPORAL
import Episode from '../models/episode.js';

const episodeRouter = Router();

const filesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/videos');
    },

    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname.split(' ').join('-');
        cb(null, fileName);
    }
})

export const videoUploader = multer({ storage: filesStorage, dest: 'storage/videos' });
expressBusboy.extend(episodeRouter);


// Get all episodes
episodeRouter.get('/:courseId/episodes/', getAll);

// Get episode
episodeRouter.get('/:courseId/episode/:episodeId', getEpisode);

// Create
episodeRouter.post('/:courseId/episodes/create', isUserAdminOrTeacher, isBodyAEpisode, create, videoUploader.single('video'));

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