import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const login = (req, res, next) => {
    const userInfo = req.body;

    User.findOne(userInfo)
    .then(user => {
        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            
            return res.status(200).json({ user, token });
        }
    })
    .catch(err => {
        return res.status(403);
    }) 
}


// Register a user
const signup = (req, res, next) => {
    const newUserInfo = req.body;

    // Search for a user with the same mail
    User.findOne({ mail: newUserInfo.mail })
    .then(userAlreadyExist => {
        if (userAlreadyExist) {
            return res.status(403).json({
                message: 'Oops looks like theres some user with the same information'
            });
        }
    })
    .catch(err => res.status(202));


    // Create the user and send the token
    User.create({
        role: 'student',
        ...newUserInfo,
        courses: []
    })
    .then(user => {
        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            user.save();
            return res.status(200).json({ user, token })
        }
    })
    .catch(err => res.status(202))

}

    

export { login, signup };