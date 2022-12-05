import { Router } from 'express';
import multer from 'multer';
import media from '../controllers/media.controller.js';

const mediaRouter = Router();

const filesStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const { courseFolder } = req.params;
		const { fieldname } = file;

		const contentSrc = `storage/courses-content/${courseFolder}`;

		req[`episode-${fieldname}`] = contentSrc;
		cb(null, contentSrc);
	},

	filename: (req, file, cb) => {
		const fileName = Date.now() + '-' + file.originalname.split(' ').join('-');
		cb(null, fileName);
	},
});

export const episodeUploader = multer({ storage: filesStorage, dest: 'storage/courses-content' });

mediaRouter.get('/video/:userId/:episodeId/:folder/:fileName', media.getEpisodeVideo);
mediaRouter.get('/miniature/:folder/:fileName', media.getEpisodeMiniature);
mediaRouter.get('/cover/:folder/:fileName', media.getCover);

export default mediaRouter;
