export function addToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

export function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}

export const BASE_URL = 'https://v2.api.noroff.dev';

export const accessToken = getFromLocalStorage('accessToken');
export const name = getFromLocalStorage('name');
export const id = getFromLocalStorage('id');
export const isLoggedIn = getFromLocalStorage('isLoggedIn');

export const apiKey = '9c615586-1ec1-4ab5-8391-37b593d6ffcd';