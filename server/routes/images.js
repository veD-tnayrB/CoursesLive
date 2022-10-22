import { Router } from "express";
import multer from "multer";
import path from 'path';

const imagesRouter = Router();

const filesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/images');
    },

    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname.split(' ').join('-');
        cb(null, fileName);
    }
})

const upload = multer({ storage: filesStorage, dest: 'storage/images' });

// Save images
imagesRouter.post('/upload', upload.single('image'), async (req, res, next) => {
    try {
        return res.status(200).json({ message: "The image has been successfully saved!" });
    }
    catch (error) {
        next(error);
    }
});

// Get images
imagesRouter.get('/:fileName', async (req, res, next) => {
    const { fileName } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'storage/images/' + fileName);

    return res.sendFile(fullfilepath);
});

export default imagesRouter;