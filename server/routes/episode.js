import { Router } from 'express';
import { getAll } from '../controllers/episode.js';

const episodeRouter = Router();

episodeRouter.get('/:courseId/episodes/', getAll);

export default episodeRouter;