import { post } from "../service/apiClient.js";

const registerForm = document.querySelector('#register-form');

async function registerNewUser(userDetails) {
    try {
        const response = await post('/auth/register', userDetails);

    } catch (error) {

    }
}

function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData);
    registerNewUser(formFields);
}

registerForm.addEventListener('submit', submitForm);