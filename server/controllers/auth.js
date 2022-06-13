import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const login = (req, res, next) => {
    const { mail, password } = req.body;

    User.findOne({ mail, password })
    .then(user => {
        const userDoesntExist = !user;

        if (userDoesntExist) {
            throw Error('UserNotFound');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        return res.status(200).json({ user, token });

    })
    .catch(error => next(error))
    
}


// Register a user
const signup = (req, res, next) => {
    const newUserInfo = req.body;

    // Search for a user with the same mail
    User.findOne({ mail: newUserInfo.mail })
    .then(userAlreadyExist => {
        if (userAlreadyExist) {
            throw Error('TheUserAlreadyExist');
        }
    })
    .catch(error => next(error));


    // Create the user and send the token
    User.create({
        role: 'student',
        ...newUserInfo,
        courses: []
    })
    .then(user => {
        const userWasntCreated = !user;

        if (userWasntCreated) {
            throw Error('UserWasntCreated');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        user.save();

        return res.status(200).json({ user, token })
    })
    .catch(error => next(error))

}

    

export { login, signup };