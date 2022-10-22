import { Router } from "express";
import path from 'path';
import multer from "multer";
const {pathname: root} = new URL('../server', import.meta.url);

const filesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../images/');
    },

    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
})    

const upload = multer({storage: filesStorage, dest: `${root}/images/`});

const fileRouter = Router();

fileRouter.post('/single', upload.single('image'), (req, res, next) => {
    console.log(1, req.file)
    console.log('me ejecuto')
    return res.status(200).json({ message: "Todo salio bien carnal" });
});

fileRouter.get('/images/:fileName', async (req, res, next) => {
    const { fileName } = req.params;
    console.log(0, process)
    const filePath = path.join(root + `/uploads/${fileName}`);
    console.log(1, filePath);

    return res.sendFile(filePath);
});

export default fileRouter;