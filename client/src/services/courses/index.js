import axios from 'axios';
import { ENVIRONMENT } from '../config';

export async function getAllCourses(signal) {
    try {
        const { data } = await axios.get(`${ENVIRONMENT}courses`, {signal});
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function searchCourses(signal, searchValue, queries) {
    const { data } = await axios.get(`${ENVIRONMENT}courses?search=${searchValue}&filter=${queries}`, {signal});
    return data;
};