import axios from 'axios';
import { ENVIRONMENT } from "../config";

export async function getAllUsers(signal, search, role) {
    try {
        const { data } = await axios.get(`${ENVIRONMENT}users?search=${search}&role=${role}`, {signal});
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function removeUser(userId) {
    try {
        const { data } = await axios.delete(`${ENVIRONMENT}users/${userId}/remove`);
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function editUser(userId) {
    try {
        const { data } = await axios.delete(`${ENVIRONMENT}users/${userId}/remove`);
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};

export async function changeUserRank(userId, rank) {
    try {
        const { data } = await axios.patch(`${ENVIRONMENT}users/'/edit/range/${userId}/${rank}'0`);
        return data;

    } catch ({ response: { data: errors } }) {
        console.error(errors);
        throw new Error(errors.message);
    }
};