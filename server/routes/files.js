import { Router } from "express";
import path from 'path';
import multer from "multer";

const filesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../images');
    },

    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
})    

export const upload = multer({storage: filesStorage});

const fileRouter = Router();

fileRouter.post('/single', upload.single('image'), (req, res, next) => {
    console.log(1, req.file)
    console.log('me ejecuto')
    return res.status(200).json({ message: "Todo salio bien carnal" });
});

fileRouter.get('/images/:fileName', async (req, res, next) => {
    const { fileName } = req.params;
    console.log(0, process)
    const filePath = path.join(OLDPWD + `/uploads/${fileName}`);
    console.log(1, filePath);

    return res.sendFile(filePath);
});

export default fileRouter;