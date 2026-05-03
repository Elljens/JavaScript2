import { get, put } from '../service/apiClient.js'

const editForm = document.querySelector('#edit-post');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const imageUrl = document.querySelector('#url');
const imageAlt = document.querySelector('#alt');

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("No post ID found");
}


async function getPostToEdit() {
    try {
        const result = await get(`/social/posts/${id}`);

        const postEdit = result.data;
        console.log(postEdit);

        titleInput.value = postEdit.title;
        bodyInput.value = postEdit.body;
        imageUrl.value = postEdit.media?.url || '';
        imageAlt.value = postEdit.media?.alt || '';

    
    } catch (error) {
    }
}

getPostToEdit();


editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const payload = {
        title: titleInput.value.trim(),
        body: bodyInput.value.trim(),
        };

        const url = imageUrl.value.trim();
        const alt = imageAlt.value.trim();

        if (url) {
            payload.media = {
                url,
                alt: alt || '',
            };
        }


    try {
        await put(`/social/posts/${id}`, payload);

        window.location.href = './profilePage.html';
    } catch (error) {
        alert(error.messsage || 'Could not update post');
    }

});





