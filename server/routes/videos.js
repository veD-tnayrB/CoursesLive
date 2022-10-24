import { Router } from "express";
import multer from "multer";
import path from 'path';

const videoRouter = Router();

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

// Save images
videoRouter.post('/upload', videoUploader.single('video'), async (req, res, next) => {
    try {
        return res.status(200).json({ message: "The image has been successfully saved!" });
    }
    catch (error) {
        next(error);
    }
});

// Get images
videoRouter.get('/watch/:fileName', async (req, res, next) => {
    const { fileName } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'storage/videos/' + fileName);

    return res.sendFile(fullfilepath);
});

export default videoRouter;