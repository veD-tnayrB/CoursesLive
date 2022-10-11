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

export async function createCourse(newCourse) {
    try {
        const { data } = await axios.get(`${ENVIRONMENT}courses/create`, newCourse);
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function searchCourses(signal, searchValue, queries) {    
    try {
        const { data } = await axios.get(`${ENVIRONMENT}courses/search?search=${searchValue}&level=${queries}`, {signal});
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function removeCourse(courseId) {
    try {
        const { data } = await axios.get(`${ENVIRONMENT}courses/${courseId}/remove`);
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function suscribeToCourse(courseId) {    
    try {
        const { data } = await axios.patch(`${ENVIRONMENT}courses/${courseId}/suscribe`);
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function unsuscribeToCourse(courseId) {    
    try {
        const { data } = await axios.patch(`${ENVIRONMENT}courses/${courseId}/unsuscribe`);
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};