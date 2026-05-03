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
export const apiKey = '504d3764-b958-4bf5-8ada-f069bdd2d35f';

