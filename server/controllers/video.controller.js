import path from 'path';
import Episode from '../models/episode.js';

class Video {
	async get(req, res, next) {
		try {
			const { userId, episodeId, fileName } = req.params;

			const che = await Episode.findByIdAndUpdate(episodeId, { $push: { views: userId } }, { new: true });
			console.log(che);
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
