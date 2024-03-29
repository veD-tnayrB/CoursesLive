import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// Routers imports
import authRouter from './routes/auth.route.js';
import courseRouter from './routes/course.route.js';
import userRouter from './routes/user.route.js';
import episodeRouter from './routes/episode.route.js';
import commentRouter from './routes/comment.route.js';
import testRouter from './routes/test.route.js';
import imagesRouter from './routes/images.route.js';
import mediaRouter from './routes/media.route.js';

// Middlewares imports
import errorHandler from './middlewares/errorHandler.js';

dotenv.config(); // This is for enviroment variables
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth/', authRouter);
app.use('/courses/', courseRouter);
app.use('/users/', userRouter);
app.use('/course/', episodeRouter);
app.use('/episode/', commentRouter);
app.use('/episode/', testRouter);
app.use('/images/', imagesRouter);
app.use('/media/', mediaRouter);

app.use(errorHandler);

// Connect with the data base and then start to listen
mongoose.connect(process.env.MONGODB_URL, (error) => {
	if (error) return console.log(`DATA BASE NOT CONNECTED`);

	app.listen(process.env.PORT, () => {
		console.log(`SERVER STARTED ON ${process.env.PORT}`);
	});
});
