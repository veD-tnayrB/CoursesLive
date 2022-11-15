import axios from 'axios';
import { ENVIRONMENT } from '../config';

class AuthService {
	async signup(user) {
		try {
			const formatedBody = { ...user, mail: body.mail.toLowerCase() };
			const { data } = await axios.post(`${ENVIRONMENT}auth/signup`, formatedBody);

			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async login(user) {
		try {
			const formatedBody = { ...user, mail: body.mail.toLowerCase() };
			const { data } = await axios.post(`${ENVIRONMENT}auth/login`, formatedBody);

			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}
}

export const authService = new AuthService();
