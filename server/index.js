import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routers imports
import authRouter from './routes/auth.js';


dotenv.config(); // This is for enviroment variables
const app = express();



// Middlewares
app.use(express.json());

// Routes
app.use('/auth/', authRouter);


// Connect with the data base and then start to listen
mongoose.connect(process.env.MONGODB_URL, () => {
    app.listen(process.env.PORT, () => {
        console.log(`SERVER STARTED ON ${process.env.PORT}`);
    })
})