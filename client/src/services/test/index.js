import axios from 'axios';
import { ENVIRONMENT } from 'src/services/config';

class TestService {
	async getOne(episodeId) {
		try {
			const { data } = await axios.get(`${ENVIRONMENT}episode/${episodeId}/test`);
			return data;
		} catch ({ response: { data: error } }) {
			console.error(error);
			throw new Error(error.message);
		}
	}

	async create(episodeId, test) {
		try {
			const { data } = await axios.post(`${ENVIRONMENT}episode/${episodeId}/test/create`, test);
			return data;
		} catch ({ response: { data: error } }) {
			console.error(error);
			throw new Error(error.message);
		}
	}

	async edit(episodeId, test) {
		try {
			const { data } = await axios.patch(`${ENVIRONMENT}episode/${episodeId}/create`, test);
			return data;
		} catch ({ response: { data: error } }) {
			console.error(error);
			throw new Error(error.message);
		}
	}

	async remove(episodeId) {
		try {
			const { data } = await axios.delete(`${ENVIRONMENT}/${episodeId}/test/remove`);
			return data;
		} catch ({ response: { data: error } }) {
			console.error(error);
			throw new Error(error.message);
		}
	}

	async saveResults(testId, options) {
		try {
			const { data } = await axios.post(`${ENVIRONMENT}episode/${testId}/save-results`, options);
			return data;
		} catch ({ response: { data: error } }) {
			console.error(error);
			throw new Error(error.message);
		}
	}
}

export const testService = new TestService();
