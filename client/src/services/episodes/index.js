import axios from 'axios';
import { ENVIRONMENT } from '../config';

export async function uploadEpisode(courseId, episode) {
    console.log(1, episode)    
    try {
        const { data } = await axios.post(`${ENVIRONMENT}course/${courseId}/episodes/create`, episode);
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function uploadVideo(video) {
    try {
        const { data } = await axios.post(`${ENVIRONMENT}videos/upload`, video, {
            headers: {
                "Referer": "https://www.scrapingbee.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};