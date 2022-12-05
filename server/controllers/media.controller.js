import Episode from '../models/episode.js';
import path from 'path';

const BASE_MEDIA_PATH = 'storage/courses-content';

class MediaController {
	async getEpisodeVideo(req, res, next) {
		try {
			const { userId, episodeId, folder, fileName } = req.params;

			await Episode.findByIdAndUpdate(episodeId, { $push: { views: userId } }, { new: true });

			const dirname = path.resolve();
			const fullfilepath = path.join(dirname, `${BASE_MEDIA_PATH}/${folder}/${fileName}`);

			return res.sendFile(fullfilepath);
		} catch (error) {
			next(error);
		}
	}

	async getEpisodeMiniature(req, res, next) {
		try {
			const { folder, fileName } = req.params;
			const dirname = path.resolve();
			const fullfilepath = path.join(dirname, `${BASE_MEDIA_PATH}/${folder}/${fileName}`);

			return res.sendFile(fullfilepath);
		} catch (error) {
			next(error);
		}
	}

	getCover(req, res, next) {
		try {
			const { folder, fileName } = req.params;
			const dirname = path.resolve();
			const fullfilepath = path.join(dirname, `${BASE_MEDIA_PATH}/${folder}/${fileName}`);

			return res.sendFile(fullfilepath);
		} catch (error) {
			next(error);
		}
	}
}

const media = new MediaController();
export default media;
