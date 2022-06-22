import { Router } from 'express';
import isBodyAUser from '../middlewares/isBodyAUser.js';
import { login, signup } from '../controllers/auth.js';

// ALSO TEMPORAL
import User from '../models/user.js';

const authRouter = Router();

// Log the user
authRouter.post('/login', isBodyAUser, login);

// Register the user
authRouter.post('/signup', isBodyAUser, signup);



// TEMPORAL
authRouter.patch('/admin/:userId', (req, res, next) => {
    const { userId } = req.params;

    User.findByIdAndUpdate({ _id: userId }, { role: 'admin' }, { new: true })
    .then(updatedUser => {
        return res.status(200).json(updatedUser);
    })
    .catch(error => next(error))
})

export default authRouter;