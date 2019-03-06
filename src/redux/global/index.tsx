import {login, isLogin, logout, init} from '../../util/session'

const LOGIN = 'login';
const LOGOUT = 'logout';
const INIT = 'init';

export const action = {
    login: {
        type: LOGIN
    },
    logout: {
        type: LOGOUT
    },
    init: {
        type: INIT
    }
};

// Reducer
export function global(state = {isLogin: isLogin()}, action) {
    switch (action.type) {
        case LOGIN:
            login();
            return {
                isLogin: true
            };
        case LOGOUT:
            logout();
            return {
                isLogin: false
            };
        case INIT:
            init();
            return state;
        default:
            return state;
    }
}