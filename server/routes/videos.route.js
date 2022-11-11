import { Router } from 'express';
import multer from 'multer';
import video from '../controllers/video.controller.js';

const videoRouter = Router();
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

// Get video
videoRouter.get('/watch/:userId/:episodeId/:fileName', video.get);

export default videoRouter;
