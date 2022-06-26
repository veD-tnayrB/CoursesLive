import User from '../models/user.js';
import Course from '../models/course.js';
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

// Remove the user
const remove = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const userToRemoveId = req.params.userId;

    try {
        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user who is removing the other exist
        const user = await User.findById(userId);
        const userDoesntExist = !user;

        if (userDoesntExist) {
            throw Error('user not found');
        }

        // Remove the user
        const removedUser = await User.findByIdAndRemove(userToRemoveId);
        
        // Update the subscribers array of all courses that the user was suscribed to
        await Course.updateMany({ subscribers: { $in: userToRemoveId } }, { $pull: { subscribers: userToRemoveId } });

        return res.status(200).json(removedUser);
    } catch (error) {
        next(error);
    }
}
export { getAll, edit, remove };