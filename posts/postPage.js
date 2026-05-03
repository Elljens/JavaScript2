import { get } from "../service/apiClient.js";

const postContainer = document.getElementById('detail-posts-container');
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("No post ID found");
}


/** fetches and rederes a single post based on its id */
async function getPost() {
    try {
        const result = await get(`/social/posts/${id}/?_author=true`);

        const post = result.data;


            if (post.media?.url) {
                const image = document.createElement('img');
                image.src = post.media.url;
                image.alt = post.media.alt;
                image.classList.add('post-image');
                postContainer.appendChild(image);
            }

            const content = document.createElement('div');
            content.classList.add('post-content');
            
            const title = document.createElement('h1');
            title.textContent = post.title;
            title.classList.add('card-title')

            const author = document.createElement('a')
            author.textContent = 'Author: ' + post.author.name;
            author.href = `./userPost.html?author=${post.author.name}`;
            author.classList.add('author');

            const created = document.createElement('p');
            created.textContent = new Date(post.created).toLocaleString();
            created.classList.add('card-created');

            const body = document.createElement('p');
            body.textContent = post.body;
            body.classList.add('card-body');

            const backLink = document.createElement('a');
            backLink.href = './allPosts.html';
            backLink.textContent = 'Back to posts';
            backLink.classList.add('back-btn');


            content.appendChild(title);
            content.appendChild(author);
            content.appendChild(created);
            content.appendChild(body);
            content.appendChild(backLink);
            postContainer.appendChild(content);

    
    } catch (error) {
    }
}

getPost();