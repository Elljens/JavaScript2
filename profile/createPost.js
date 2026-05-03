import { post } from "../service/apiClient.js";

const createPost = document.querySelector('#create-post');

async function createNewPost(postData) {
    try {
        const newPost = await post('/social/posts', postData);

        window.location.href = './profilePage.html';

    } catch (error) {
        throw error.message;
    }
};

function submittingPost(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const payload = {
        title: data.title,
        body: data.body,
        media: data['url']
        ? {
            url: data['url'],
            alt: data['alt']
        }
        : undefined
    };

    createNewPost(payload);
};


createPost.addEventListener('submit', submittingPost);