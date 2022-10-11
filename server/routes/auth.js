import { Router } from 'express';
import { login, signup } from '../controllers/auth.js';
import isBodyAUser from '../dtos/isBodyAUser.js';

// ALSO TEMPORAL
import User from '../models/user.js';

const authRouter = Router();

// Log the user
authRouter.post('/login', login);

// Register the user
authRouter.post('/signup', isBodyAUser, signup);



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