import { addToLocalStorage } from "../utils.js";
import { post } from "../apiClient.js";

const logInForm = document.querySelector('#login-form');

async function loginUser(userDetails) {
    try {
        const response = await post('/auth/login', userDetails);

        console.log(response);
        if (response.ok) {
            const accessToken = json.data.accessToken;
            const name = json.data.name;
            const isLoggedIn = response.ok;

            addToLocalStorage('name', name);
            addToLocalStorage('accessToken', accessToken);
            addToLocalStorage('isLoggedIn', isLoggedIn);
        }

    } catch (error) {
        throw error.message;
    }
};



function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData);
    loginUser(formFields);
}

logInForm.addEventListener('submit', submitForm);