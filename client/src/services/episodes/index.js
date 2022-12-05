import axios from 'axios';
import { ENVIRONMENT } from '../config';

class EpisodeService {
	async uploadEpisode(courseId, folder, episode) {
		try {
			const { data } = await axios.post(`${ENVIRONMENT}course/${courseId}/${folder}/episodes/create`, episode);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async getEpisodes(signal, filterBy, courseId) {
		try {
			const { data } = await axios.get(`${ENVIRONMENT}course/${courseId}/episodes?filterBy=${filterBy}`, { signal });
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async getOne(signal, courseId, episodeId) {
		try {
			const { data } = await axios.get(`${ENVIRONMENT}course/${courseId}/episode/${episodeId}`, { signal });
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async like(courseId, episodeId) {
		try {
			const { data } = await axios.get(`${ENVIRONMENT}course/${courseId}/episodes/${episodeId}/like`);
			return data;
		} catch ({ response }) {
			console.error(errors);
			throw new Error(errors);
		}
	}

	async unlike(courseId, episodeId) {
		try {
			const { data } = await axios.get(`${ENVIRONMENT}course/${courseId}/episodes/${episodeId}/unlike`);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async remove(courseId, episodeId) {
		try {
			const { data } = await axios.delete(`${ENVIRONMENT}course/${courseId}/episodes/${episodeId}/delete`);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async createComment(episodeId, comment) {
		try {
			const { data } = await axios.post(`${ENVIRONMENT}episode/${episodeId}/comment/create`, comment);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async getComments(signal, episodeId) {
		try {
			const { data } = await axios.get(`${ENVIRONMENT}episode/${episodeId}/comments`, { signal });
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async editComment(episodeId, commentId, editedComment) {
		try {
			const { data } = await axios.patch(`${ENVIRONMENT}episode/${episodeId}/comment/${commentId}/edit`, editedComment);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async removeComment(episodeId, commentId) {
		try {
			const { data } = await axios.delete(`${ENVIRONMENT}episode/${episodeId}/comment/${commentId}/remove`);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}
}

export const episodeService = new EpisodeService();
