import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';

// Routers imports
import authRouter from './routes/auth.js';
import courseRouter from './routes/course.js';
import userRouter from './routes/user.js';
import episodeRouter from './routes/episode.js';
import commentRouter from './routes/comment.js';
import testRouter from './routes/test.js';
import fileRouter from './routes/files.js';

// Middlewares imports
import errorHandler from './middlewares/errorHandler.js';
const {pathname: root} = new URL('../server', import.meta.url);

dotenv.config(); // This is for enviroment variables
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(root + '/images'));
console.log(root + '/images')

// Routes
app.use('/auth/', authRouter);
app.use('/courses/', courseRouter);
app.use('/users/', userRouter);
app.use('/course/', episodeRouter);
app.use('/episode/', commentRouter);
app.use('/episode/', testRouter); // WORK IN PROGRESS
app.use('/files/', fileRouter);

app.use(errorHandler);


// Connect with the data base and then start to listen
mongoose.connect(process.env.MONGODB_URL, (error) => {
    if (error) return console.log(`DATA BASE NOT CONNECTED`);

    app.listen(process.env.PORT, () => {
        console.log(`SERVER STARTED ON ${process.env.PORT}`);
    })
})