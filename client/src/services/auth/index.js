import axios from 'axios';
import { ENVIRONMENT } from '../config';

class AuthService {
	async signup(user) {
		try {
			const formatedBody = { ...user, mail: user.mail.toLowerCase() };
			const { data } = await axios.post(`${ENVIRONMENT}auth/signup`, formatedBody);

			return data;
		} catch ({
			response: {
				data: { error },
			},
		}) {
			console.error(error);
			throw new Error(error);
		}
	}

	async login(user) {
		try {
			const formatedBody = { ...user, mail: user.mail.toLowerCase() };
			const { data } = await axios.post(`${ENVIRONMENT}auth/login`, formatedBody);

			return data;
		} catch ({
			response: {
				data: { error },
			},
		}) {
			console.error(error);
			throw new Error(error);
		}
	}
}

export const authService = new AuthService();
