import axios from 'axios';
import { ENVIRONMENT } from '../config';

export async function getAllCourses(signal, search, level) {
    try {
        const { data } = await axios.get(`${ENVIRONMENT}courses?search=${search}&level=${level}`, {signal});
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function createCourse(newCourse) {
    try {
        const { data } = await axios.post(`${ENVIRONMENT}courses/create`, newCourse);
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function removeCourse(courseId) {
    try {
        const { data } = await axios.delete(`${ENVIRONMENT}courses/${courseId}/remove`);
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

export async function editCourse(courseId, newCourseData) {    
    try {
        const { data } = await axios.patch(`${ENVIRONMENT}courses/${courseId}/edit`, newCourseData);
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};