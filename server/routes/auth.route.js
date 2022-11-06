import { Router } from 'express';
import auth from '../controllers/auth.controller.js';
import isBodyAUser from '../dtos/isBodyAUser.js';

// ALSO TEMPORAL
import User from '../models/user.js';

const authRouter = Router();

// Log the user
authRouter.post('/login', auth.login);

// Register the user
authRouter.post('/signup', isBodyAUser, auth.signup);

// TEMPORAL
authRouter.get('/admin', (req, res, next) => {
    const userId = req.query.user;

    User.findByIdAndUpdate({ _id: userId }, { role: 'admin' }, { new: true })
    .then(updatedUser => {
        return res.status(200).json(updatedUser);
    })
    .catch(error => next(error))
})

export default authRouter;