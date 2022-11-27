import path from 'path';
import Episode from '../models/episode.js';

class Video {
	async get(req, res, next) {
		try {
			const { userId, episodeId, fileName } = req.params;

			await Episode.findByIdAndUpdate(episodeId, { $push: { views: userId } }, { new: true });

			const dirname = path.resolve();
			const fullfilepath = path.join(dirname, 'storage/videos/' + fileName);

			return res.sendFile(fullfilepath);
		} catch (error) {
			next(error);
		}
	}

	async getMiniature(req, res, next) {
		try {
			const { fileName } = req.params;
			const dirname = path.resolve();
			const fullfilepath = path.join(dirname, 'storage/videos/' + fileName);

			return res.sendFile(fullfilepath);
		} catch (error) {
			next(error);
		}
	}
}

const video = new Video();
export default video;
