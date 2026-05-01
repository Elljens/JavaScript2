import { get } from "./apiClient.js";

const allPostsContainer = document.getElementById('all-posts-container');
const loadMoreButton = document.getElementById('load-more-btn');

let currentPage = 1;
let isFetching = false;

async function getAllPosts(page) {
    isFetching = true;
    loadMoreButton.textContent = 'Loading...';
    loadMoreButton.disabled = true;

    try {
        const response = await get(`/social/posts?page=${page}&limit=10`);
        const posts = response.data;
        const meta = response.meta;


        posts.forEach((post) => {
            const card = document.createElement('div');
            card.classList.add('card')

            if (post.media?.url) {
                const image = document.createElement('img');
                image.src = post.media.url;
                image.alt = post.media.alt;
                image.classList.add('post-image');
                card.appendChild(image);
            }

            console.log(post)
            
            const title = document.createElement('h3');
            title.textContent = post.title;
            title.classList.add('card-title')

            const created = document.createElement('p');
            created.textContent = post.created;
            created.classList.add('card-created')

            const body = document.createElement('p');
            body.textContent = post.body;
            body.classList.add('card-body')

            const link = document.createElement('a');
            link.href = `./postPage.html?id=${post.id}`;
            link.classList.add('card-link');

            card.appendChild(title);
            card.appendChild(created);
            card.appendChild(body);
            link.appendChild(card);
            allPostsContainer.appendChild(link);
        });

        if (meta.isLastPage) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.textContent = 'Load more';
            loadMoreButton.disabled = false;
        }
    } catch (error) {
        loadMoreButton.textContent = 'Failed to load. Try again';
        loadMoreButton.disabled = false;
        console.log(error);
    } finally {
        isFetching = false;
    }
}

loadMoreButton.addEventListener('click', () => {
    if (!isFetching) {
        currentPage++;
        getAllPosts(currentPage);
    }
});

getAllPosts(currentPage);