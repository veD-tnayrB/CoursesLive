import { Router } from 'express';
import { getEpisodes } from '../controllers/episode';

const episodeRouter = Router();

episodeRouter.get('/:courseId/episodes/', getEpisodes);

export default episodeRouter;