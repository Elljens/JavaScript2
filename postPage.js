import { get } from "./apiClient.js";

const postContainer = document.getElementById('detail-posts-container');
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("No post ID found");
}

async function getPost() {
    try {
        const result = await get(`/social/posts/${id}`);

        const post = result.data;
        console.log(post);


            if (post.media?.url) {
                const image = document.createElement('img');
                image.src = post.media.url;
                image.alt = post.media.alt;
                image.classList.add('post-image');
                postContainer.appendChild(image);
            }

            const content = document.createElement('div');
            content.classList.add('post-content');
            
            const title = document.createElement('h2');
            title.textContent = post.title;
            title.classList.add('card-title')

            const created = document.createElement('p');
            created.textContent = post.created;
            created.classList.add('card-created')

            const body = document.createElement('p');
            body.textContent = post.body;
            body.classList.add('card-body')

            const backLink = document.createElement('a');
            backLink.href = './index.html';
            backLink.textContent = 'Back to posts';
            backLink.classList.add('back-btn');


            content.appendChild(title);
            content.appendChild(created);
            content.appendChild(body);
            content.appendChild(backLink);
            postContainer.appendChild(content);

    
    } catch (error) {
        console.error(error);
    }
}

getPost();