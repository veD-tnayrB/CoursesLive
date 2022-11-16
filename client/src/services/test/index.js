class TestService {
	async getOne(episodeId) {
		try {
			const { data } = await axios.get(`${ENVIRONMENT}episode/${episodeId}/test`, { signal });
			return data;
		} catch ({ response: { data: error } }) {
			console.error(error);
			throw new Error(error.message);
		}
	}

	async create(episodeId, test) {
		try {
			const { data } = await axios.post(`${ENVIRONMENT}episode/${episodeId}/create`, test);
			return data;
		} catch ({ response: { data: error } }) {
			console.error(error);
			throw new Error(error.message);
		}
	}

	async edit(episodeId, test) {
		try {
			const { data } = await axios.patch(`${ENVIRONMENT}episode/${episodeId}/create`, test);
			return data;
		} catch ({ response: { data: error } }) {
			console.error(error);
			throw new Error(error.message);
		}
	}

	async remove(episodeId) {
		try {
			const { data } = await axios.delete(`${ENVIRONMENT}/${episodeId}/test/remove`);
			return data;
		} catch ({ response: { data: error } }) {
			console.error(error);
			throw new Error(error.message);
		}
	}
}
export async function getAllUsers(signal, episodeId) {
	try {
		const { data } = await axios.get(`${ENVIRONMENT}users?search=${search}&role=${role}`, { signal });
		return data;
	} catch ({ response: { data: error } }) {
		console.error(error);
		throw new Error(error.message);
	}
}

export const testService = new TestService();
