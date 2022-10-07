import axios from 'axios';
import { ENVIRONMENT } from '../config';

export async function signup(body) {
    try {
        const formatedBody = {...body, mail: body.mail.toLowerCase()};
        const { data } = await axios.post(`${ENVIRONMENT}auth/signup`, formatedBody);
        
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function login(body) {
    try {
        const formatedBody = {...body, mail: body.mail.toLowerCase()};
        const { data } = await axios.post(`${ENVIRONMENT}auth/login`, formatedBody);
        
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};