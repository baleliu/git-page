const YES = '1';
const NO = '0';

const init = () => {
    sessionStorage.clear();
    window.sessionStorage.setItem('login', NO);
};

const login = () => {
    window.sessionStorage.setItem('login', YES);
};

const logout = () => {
    window.sessionStorage.setItem('login', NO);
};

const isLogin = () => {
    return window.sessionStorage.getItem('login') === YES;
}


export default {
    login: login,
    isLogin: isLogin,
    logout: logout
}