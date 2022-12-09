export const ACTIONS = {
	login: 'login',
	signup: 'signup',
	logout: 'logout',
	update: 'update',
	reportError: 'reportError',
};

export function authReducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.login: {
			return {
				user: payload,
				error: '',
				fetched: true,
			};
		}

		case ACTIONS.signup: {
			return {
				user: payload,
				error: '',
				fetched: true,
			};
		}

		case ACTIONS.logout: {
			return {
				user: {},
				error: '',
				fetched: false,
			};
		}

		case ACTIONS.reportError: {
			return {
				user: {},
				error: payload,
				fetched: false,
			};
		}

		case ACTIONS.update: {
			return {
				user: { ...payload, token: state.user.token },
				error: '',
				fetched: true,
			};
		}
	}
}
