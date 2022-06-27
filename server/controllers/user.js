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

        // Check if the user who is performing the operation exists
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

// Promote user
const promote = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const userToPromoteId = req.params.userId;
    const rankToBePromoted = req.params.rank;

    try {
        // Check if the role is correct
        if (rankToBePromoted !== 'admin' && rankToBePromoted !== 'teacher') {
            throw Error('role invalid');
        }

        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user who is performing the operation exists
        const user = await User.findById(userId);
        const userDoesntExist = !user;
        
        if (userDoesntExist) {
            throw Error('user doesnt exist');
        }

        // Update the promoted user role
        const updatedUser = await User.findByIdAndUpdate(userToPromoteId, { role: rankToBePromoted }, { new: true });

        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export { getAll, edit, promote, remove };