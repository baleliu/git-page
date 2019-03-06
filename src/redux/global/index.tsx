const LOGIN = 'login';
const LOGOUT = 'logout';

export const action = {
    login: {
        type: LOGIN
    },
    logout: {
        type: LOGOUT
    }
};

// Reducer
export function global(state = {isLogin: false}, action) {
    switch (action.type) {
        case LOGIN:
            return {
                isLogin: true
            };
        case LOGOUT:
            return {
                isLogin: false
            };
        default:
            return state;
    }
}