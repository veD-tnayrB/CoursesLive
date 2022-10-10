import axios from 'axios';
import { ENVIRONMENT } from "../config";

export async function getAllUsers(signal) {
    try {
        const { data } = await axios.get(`${ENVIRONMENT}users`, {signal});
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function searchUsers(signal, search, role) {
    try {
        const { data } = await axios.get(`${ENVIRONMENT}users/search?search=${search}&role=${role}`, {signal});
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};