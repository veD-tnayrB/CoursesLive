import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const DEFAULT_ROLE = 'student';

class Auth {
	async login(req, res, next) {
		try {
			const userInfo = req.body;

			// Log the user by sending the token to the client and the user information
			const user = await User.findOne({ mail: userInfo.mail, password: userInfo.password }, '-courses');
			if (!user) return res.status(404).json({ error: 'USER_NOT_FOUND' });

			const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
			return res.status(200).json({ user, token });
		} catch (error) {
			next(error);
		}
	}

	async signup(req, res, next) {
		try {
			const userInfo = req.body;

			// Search for a user with the same mail
			const user = await User.findOne({ mail: userInfo.mail });
			const userAlreadyExist = user;

			if (userAlreadyExist) return res.status(409).json('USER_ALREADY_EXISTS');

			// Create the user and send the token
			const newUser = await User.create({
				...userInfo,
				mail: userInfo.mail.toLowerCase(),
				profileImage: 'default-user.svg',
				role: DEFAULT_ROLE,
				courses: [],
			});

			const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET);
			newUser.save();
			return res.status(201).json({ user: newUser, token });
		} catch (error) {
			next(error);
		}
	}
}

const auth = new Auth();
export default auth;
