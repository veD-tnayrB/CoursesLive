import { Router } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import multer from 'multer';

// const storage = multer.diskStorage({
//     filename: (req, file, cb) => {
//         const fileName = `${file.fieldname}-${Date.now()}`;
//         cb(null, fileName);
//     }
// })

// const upload = multer({ 
//     dest: 'uploads/',
//     storage
    
// }) // Multer config

const fileRouter = Router();

fileRouter.post('/upload', (req, res, next) => {
    console.log(1, req);
    console.log(2, res);
});

fileRouter.get('/images/:fileName', async (req, res, next) => {
    const { fileName } = req.params;
    console.log(0, process)
    const filePath = path.join(OLDPWD + `/uploads/${fileName}`);
    console.log(1, filePath);

    return res.sendFile(filePath);
});

export default fileRouter;