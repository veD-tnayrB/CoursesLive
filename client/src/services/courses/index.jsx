import axios from 'axios';
import { ENVIRONMENT } from '../config';

export async function getAllCourses(signal) {
    const { data } = await axios.get(`${ENVIRONMENT}courses/`, {signal});
    return data;
};

export async function searchCourses(signal, searchValue, queries) {
    const { data } = await axios.get(`${ENVIRONMENT}courses?search=${searchValue}&filter=${queries}`, {signal});
    return data;
};