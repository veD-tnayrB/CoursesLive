import axios from 'axios';
import { ENVIRONMENT } from '../config';

export async function getAllCourses(signal) {
    const { data } = await axios.get(`${ENVIRONMENT}courses/`, {signal});
    return data;
};

export async function filterCourses(signal, queries) {
    const { data } = await axios.get(`${ENVIRONMENT}courses/filter?tags=${queries}`, {signal});
    return data;
};