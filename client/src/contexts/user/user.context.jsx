import * as React from 'react';
import { ACTIONS, userReducer } from './user.reducer';
import { signup as signupService, login as loginService } from 'src/services/auth';

export const UserContext = React.createContext();
export const useUserContext = () => React.useContext(UserContext);

const savedUser = JSON.parse(localStorage.getItem('user')) ?? {};
const thereSavedUser = Object.entries(savedUser).length > 0;
const USER_INITIAL_STATE = thereSavedUser ? savedUser : {
    user: {},
    error: '',
    fetched: false
};

export default
function UserContextProvider({ children }) {
    const [state, dispatch] = React.useReducer(userReducer, USER_INITIAL_STATE);
    const isUserLogged = state.fetched && state.user;

    React.useEffect(() => localStorage.setItem('user', JSON.stringify(state)), [state]);

    async function signup(user) {
        try {
            const response = await signupService(user);
            dispatch({type: ACTIONS.signup, payload: {...response.user, token: response.token}});
            return true;

        } catch (err) {
            dispatch({type: ACTIONS.reportError, payload: err.message});
            return false;
        };
    };

    async function login(user) {
        try {
            const response = await loginService(user);
            dispatch({type: ACTIONS.login, payload: {...response.user, token: response.token}});
            return true;

        } catch (err) {
            dispatch({type: ACTIONS.reportError, payload: err.message});
            throw new Error()
        };
    };

    const contextValue = {
        user: state.user,
        error: state.error,
        fetched: state.fetched, 
        isUserLogged, 
        signup,
        login
    }

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}