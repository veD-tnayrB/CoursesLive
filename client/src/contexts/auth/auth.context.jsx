import * as React from 'react';
import axios from 'axios';
import { ACTIONS, authReducer } from './auth.reducer';
import { authService } from 'src/services/auth';

export const AuthContext = React.createContext();
export const useAuthContext = () => React.useContext(AuthContext);

const savedUser = JSON.parse(localStorage.getItem('user')) ?? {};
const thereSavedUser = Object.entries(savedUser).length > 0;
const USER_INITIAL_STATE = thereSavedUser
	? savedUser
	: {
			user: {},
			error: '',
			fetched: false,
	  };

export default function AuthContextProvider({ children }) {
	const [state, dispatch] = React.useReducer(authReducer, USER_INITIAL_STATE);
	axios.defaults.headers.common['Authorization'] = state.user.token ?? '';
	const isUserLogged = state.fetched && state.user;

	React.useEffect(() => localStorage.setItem('user', JSON.stringify(state)), [state]);

	async function signup(user) {
		try {
			const response = await authService.signup(user);
			dispatch({ type: ACTIONS.signup, payload: { ...response.user, token: response.token } });
			return true;
		} catch (err) {
			dispatch({ type: ACTIONS.reportError, payload: err.message });
			return false;
		}
	}

	async function login(user) {
		try {
			const response = await authService.login(user);
			dispatch({ type: ACTIONS.login, payload: { ...response.user, token: response.token } });
			return true;
		} catch (err) {
			dispatch({ type: ACTIONS.reportError, payload: err.message });
			console.log(err);
		}
	}

	function logout() {
		dispatch({ type: ACTIONS.logout });
	}

	function updateInfo(updatedUser) {
		dispatch({ type: ACTIONS.update, payload: updatedUser });
	}

	const contextValue = {
		user: state.user,
		error: state.error,
		fetched: state.fetched,
		isUserLogged,
		signup,
		login,
		logout,
		updateInfo,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
