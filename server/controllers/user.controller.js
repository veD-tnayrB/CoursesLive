import User from '../models/user.js';
import Course from '../models/course.js';

class UserController {
	async getAll(req, res, next) {
		try {
			const theresQueries = req.query;
			let users;

			if (theresQueries) {
				const { role, search: userName } = req.query;
				users = await User.find({ role: { $regex: role }, name: { $regex: userName } });
				return res.status(200).json(users);
			}

			const allUsers = await User.find({});
			return res.status(200).json(allUsers);
		} catch (error) {
			next(error);
		}
	}

	async getOne(req, res, next) {
		try {
			const userId = req.params.id;
			const user = await User.findById(userId).populate('courses');

			if (!user) throw new Error('ERROR');

			return res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	async edit(req, res, next) {
		const newUserInfo = req.body;

		try {
			const user = req.user;
			const userToModify = req.params.userId;

			// Check if the user already exist and update it
			const newUser = await User.findByIdAndUpdate(userToModify, { ...newUserInfo }, { new: true });
			const userDoesntExist = !newUser;

			if (userDoesntExist) return res.status(404).json('USER_NOT_FOUND');

			return res.status(200).json({ editedUser: newUser });
		} catch (error) {
			next(error);
		}
	}

	async remove(req, res, next) {
		const userToRemoveId = req.params.userId;

		try {
			// Remove the user
			const removedUser = await User.findByIdAndRemove(userToRemoveId);

			// Update the subscribers array of all courses that the user was suscribed to
			await Course.updateMany({ subscribers: { $in: userToRemoveId } }, { $pull: { subscribers: userToRemoveId } });

			return res.status(200).json(removedUser);
		} catch (error) {
			next(error);
		}
	}

	async editRange(req, res, next) {
		const userToBeEditedId = req.params.userId;
		const rank = req.params.rank;

		try {
			// Check if the role is correct
			if (rank !== 'admin' && rank !== 'teacher' && rank !== 'student') {
				throw Error('role invalid');
			}

			// Update the promoted user role
			const updatedUser = await User.findByIdAndUpdate(userToBeEditedId, { role: rank }, { new: true });

			return res.status(200).json(updatedUser);
		} catch (error) {
			next(error);
		}
	}

	async search(req, res, next) {
		const roleToSearch = req.query.role;
		const userName = req.query.search;

		try {
			const filteredUsers = await User.find({ role: { $regex: roleToSearch }, name: { $regex: userName } });
			return res.status(200).json(filteredUsers);
		} catch (error) {
			next(error);
		}
	}
}

const userController = new UserController();
export default userController;
