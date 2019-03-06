const YES = '1';
const NO = '0';

export const init = () => {
    sessionStorage.clear();
    window.sessionStorage.setItem('login', NO);
};

export const login = () => {
    window.sessionStorage.setItem('login', YES);
};

export const logout = () => {
    window.sessionStorage.setItem('login', NO);
};

export const isLogin = () => {
    return window.sessionStorage.getItem('login') === YES;
}