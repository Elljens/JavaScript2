import { get } from "./apiClient.js";

const allPostsContainer = document.getElementById('all-posts-container');
const loadMoreButton = document.getElementById('load-more-btn');
const searchInput = document.getElementById('searchInput');


let currentPage = 1;
let isFetching = false;
let allPosts = []; 
let filteredPosts = []; 
let currentSearch = "";


async function getAllPosts(page) {
    if (isFetching) return;

    isFetching = true;
    loadMoreButton.textContent = 'Loading...';
    loadMoreButton.disabled = true;

    try {
        const response = await get(`/social/posts?page=${page}&limit=10`);

        allPosts = [...allPosts, ...response.data];

        applySearch(currentSearch);

        if (response.meta.isLastPage) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.textContent = 'Load more';
            loadMoreButton.disabled = false;
        }

    } catch (error) {
        console.error(error);
        loadMoreButton.textContent = 'Failed to load. Try again';
        loadMoreButton.disabled = false;
    } finally {
        isFetching = false;
    }
}


function renderPosts(postsToRender) {
    allPostsContainer.innerHTML = '';

    if (postsToRender.length === 0) {
        allPostsContainer.innerHTML = '<p>No posts found.</p>';
        return;
    }

    postsToRender.forEach((post) => {
        const card = document.createElement('div');
        card.classList.add('card');

        if (post.media?.url) {
            const image = document.createElement('img');
            image.src = post.media.url;
            image.alt = post.media.alt || '';
            image.classList.add('post-image');
            card.appendChild(image);
        }

        const title = document.createElement('h3');
        title.textContent = post.title;

        const created = document.createElement('p');
        created.textContent = new Date(post.created).toLocaleString();

        const body = document.createElement('p');
        body.textContent = post.body;

        const link = document.createElement('a');
        link.href = `./postPage.html?id=${post.id}`;
        link.classList.add('card-link');

        card.appendChild(title);
        card.appendChild(created);
        card.appendChild(body);
        link.appendChild(card);

        allPostsContainer.appendChild(link);
    });
}


function applySearch(searchTerm) {
    currentSearch = searchTerm.toLowerCase().trim();

    if (!currentSearch) {
        filteredPosts = [...allPosts];
    } else {
        filteredPosts = allPosts.filter((post) => {
            const title = post.title?.toLowerCase() || '';
            const body = post.body?.toLowerCase() || '';

            return (
                title.includes(currentSearch) ||
                body.includes(currentSearch)
            );
        });
    }

    renderPosts(filteredPosts);
}


searchInput.addEventListener('input', (event) => {
    applySearch(event.target.value);
});

loadMoreButton.addEventListener('click', () => {
    currentPage++;
    getAllPosts(currentPage);
});


getAllPosts(currentPage);






