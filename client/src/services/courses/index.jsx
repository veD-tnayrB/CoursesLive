import axios from 'axios';
import { ENVIRONMENT } from '../config';

export async function getAllCourses(source) {
    const { data } = await axios.get(`${ENVIRONMENT}courses/`, {
        cancelToken: source.token,
      });
      
    return data;
};

export async function filterCourses(source, queries) {
    const { data } = await axios.get(`${ENVIRONMENT}courses/filter?tags=${queries}`, {
        cancelToken: source.token,
      });

    return data;
};