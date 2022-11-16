import axios from 'axios';
import { ENVIRONMENT } from '../config';

class CourseService {
	async getAll(signal, search, level) {
		try {
			const { data } = await axios.get(`${ENVIRONMENT}courses?search=${search}&level=${level}`, { signal });
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async create(newCourse) {
		try {
			const { data } = await axios.post(`${ENVIRONMENT}courses/create`, newCourse);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async remove(courseId) {
		try {
			const { data } = await axios.delete(`${ENVIRONMENT}courses/${courseId}/remove`);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async suscribe(courseId) {
		try {
			const { data } = await axios.patch(`${ENVIRONMENT}courses/${courseId}/suscribe`);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async unsuscribe(courseId) {
		try {
			const { data } = await axios.patch(`${ENVIRONMENT}courses/${courseId}/unsuscribe`);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async edit(courseId, newCourseData) {
		try {
			const { data } = await axios.patch(`${ENVIRONMENT}courses/${courseId}/edit`, newCourseData);
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}

	async getOne(signal, courseId) {
		try {
			const { data } = await axios.get(`${ENVIRONMENT}courses/course/${courseId}`, { signal });
			return data;
		} catch ({ response: { data: errors } }) {
			console.error(errors);
			throw new Error(errors.message);
		}
	}
}

export const courseService = new CourseService();
