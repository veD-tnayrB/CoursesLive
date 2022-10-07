export const ACTIONS = {
    'login': 'login',
    'signup': 'signup',
    'logout': 'logout',
    'reportError': 'reportError'
};

export function userReducer(state, {type, payload}) {
    console.log(4, payload);
    switch(type) {
        case ACTIONS.login: {
            return {
                user: payload,
                error: '',
                fetched: true
            }            
        }

        case ACTIONS.signup: {
            return {
                user: payload,
                error: '',
                fetched: true
            }
        }

        case ACTIONS.logout: {
            return {
                user: {},
                error: '',
                fetched: false
            }
        }

        case ACTIONS.reportError: {
            return {
                user: {},
                error: payload,
                fetched: false
            }
        }
    }
}