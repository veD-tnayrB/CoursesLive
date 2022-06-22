import User from '../models/user.js';

const getAll = async (req, res, next) => {
    try {
        const allUsers = await User.find({ });

        return res.status(200).json({ users: allUsers });
    } catch (error) {
        next(error);
    }
}

export { getAll }