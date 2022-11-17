import axios from 'axios';
import { ENVIRONMENT } from '../config';

class UserService {
	async getAllUsers(signal, search, role) {
		try {
			const { data } = await axios.get(`${ENVIRONMENT}users?search=${search}&role=${role}`, { signal });
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async removeUser(userId) {
		try {
			const { data } = await axios.delete(`${ENVIRONMENT}users/${userId}/remove`);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async editUser(userId) {
		try {
			const { data } = await axios.delete(`${ENVIRONMENT}users/${userId}/remove`);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async changeUserRank(userId, rank) {
		try {
			const { data } = await axios.patch(`${ENVIRONMENT}users/'/edit/range/${userId}/${rank}'0`);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async getUserById(signal, userId) {
		try {
			const { data } = await axios.get(`${ENVIRONMENT}users/user/${userId}`, { signal });
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}
}

export const userService = new UserService();
