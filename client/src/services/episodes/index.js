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
};