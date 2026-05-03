import { addToLocalStorage, BASE_URL } from "../service/utils.js";

const logInForm = document.querySelector('#login-form');
const Login_URL = `${BASE_URL}/auth/login`;

async function loginUser(userDetails) {
    try {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-type': 'application/json',
            },
        };

        const response = await fetch(Login_URL, fetchOptions);
        const json = await response.json();

    if (response.ok) {
        const accessToken = json.data.accessToken;
        const name = json.data.name;

        addToLocalStorage('name', name);
        addToLocalStorage('accessToken', accessToken);

        window.location.href = '../posts/allPosts.html';

        } 

    } catch (error) {
}
}


function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData);
    loginUser(formFields);
}

logInForm.addEventListener('submit', submitForm);



export function logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
}