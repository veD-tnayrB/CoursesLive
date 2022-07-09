import User from '../models/user.js';
import Course from '../models/course.js';
import jwt from 'jsonwebtoken';

// Get all users
const getAll = async (req, res, next) => {
    const { authorization: token } = req.headers;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the consulting user is authorized
        const userIsAuthorized = User.findOne({ _id: user.id, role: user.role });
        const userIsntAuthorized = !userIsAuthorized;

        if (userIsntAuthorized) {
            throw Error('user not authorized');
        }

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

    const editedUser = {
        name: newUserInfo.name,
        lastName: newUserInfo.lastName,
        mail: newUserInfo.mail,
        password: newUserInfo.password,
    }

    try {
        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user already exist and update it
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
        const remover = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user who is performing the operation exists
        const user = await User.findOne({ id: remover.id, role: remover.role });
        const userIsntAdmin = !user;

        if (userIsntAdmin) {
            throw Error('user not authorized');
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

// Edit the user range
const editRange = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const userToPromoteId = req.params.userId;
    const rank = req.params.rank;

    try {
        // Check if the role is correct
        if (rank !== 'admin' && rank !== 'teacher' && rank) {
            throw Error('role invalid');
        }

        const editor = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user who is performing the operation exists and if is admin
        const user = await User.findOne({ id: editor.id, role: editor.role });
        const userIsntAdmin = !user;
        
        if (userIsntAdmin) {
            throw Error('user not authorized');
        }

        // Update the promoted user role
        const updatedUser = await User.findByIdAndUpdate(userToPromoteId, { role: rank }, { new: true });

        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export { getAll, edit, editRange, remove };