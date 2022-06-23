import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// Get all users
const getAll = async (req, res, next) => {
    try {
        const allUsers = await User.find({ });

        return res.status(200).json({ users: allUsers });
    } catch (error) {
        next(error);
    }
}

// Edit user info
const edit = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const newUserInfo = req.body;

    try {
        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

        const editedUser = {
            name: newUserInfo.name,
            lastName: newUserInfo.lastName,
            mail: newUserInfo.mail,
            password: newUserInfo.password,
        }

        // Verify if the user already exist and update it
        const user = await User.findByIdAndUpdate(userId, editedUser, { new: true });
        const userWasntEdited = !user;

        if (userWasntEdited) {
            throw Error('user wasnt edited');
        }

        return res.status(200).json({ editedUser: user });

    } catch (error) {
        next(error);
    }
} 


export { getAll, edit }