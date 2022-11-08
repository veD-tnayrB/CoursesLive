import axios from 'axios';
import { ENVIRONMENT } from '../config';

export async function uploadEpisode(courseId, episode) {
    try {
        const { data } = await axios.post(`${ENVIRONMENT}course/${courseId}/episodes/create`, episode);
        return data;
    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
}

export async function getEpisodes(signal, courseId) {
    try {
        const { data } = await axios.post(`${ENVIRONMENT}course/${courseId}/episodes`, { signal });
        return data;
    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
}

export async function getOne(signal, courseId, episodeId) {
    try {
        const { data } = await axios.get(`${ENVIRONMENT}course/${courseId}/episode/${episodeId}`, { signal });
        return data;
    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
}

export async function like(courseId, episodeId) {
    try {
        const { data } = await axios.get(`${ENVIRONMENT}course/${courseId}/episodes/${episodeId}/like`);
        return data;
    } catch ({ response }) {
        console.error(errors);
        throw new Error(errors);
    }
}

export async function unlike(courseId, episodeId) {
    try {
        const { data } = await axios.get(`${ENVIRONMENT}course/${courseId}/episodes/${episodeId}/unlike`);
        return data;
    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
}

export async function remove(courseId, episodeId) {
    try {
        const { data } = await axios.delete(`${ENVIRONMENT}course/${courseId}/episodes/${episodeId}/delete`);
        return data;
    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
}

export async function createComment(episodeId, comment) {
    try {
        const { data } = await axios.post(`${ENVIRONMENT}episode/${episodeId}/comment/create`, comment);
        return data;
    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
}
