import { get, del } from "../service/apiClient.js";
import { name } from "../service/utils.js";

const profileContainer = document.getElementById('profile-container');
const postContainer = document.querySelector('.post-container');

/** fetches and rendering the profile of the user */
async function getProfile() {
    try {
        const result = await get(`/social/profiles/${name}`);

        const profile = result.data;

        const banner = document.createElement('img');
        banner.src = profile.banner.url;
        banner.alt = profile.banner.alt;
        banner.classList.add('profile-banner');

        const avatar = document.createElement('img');
        avatar.src = profile.avatar.url;
        avatar.alt = profile.avatar.alt;
        avatar.classList.add('avatar');

        const user = document.createElement('h1');
        user.textContent = profile.name;
        user.classList.add('profile-name');

        const logOutBtn = document.createElement('button');
        logOutBtn.textContent = 'Log out';
        logOutBtn.classList.add('logout-btn');

        logOutBtn.addEventListener('click', function (event) {
            event.preventDefault();

            localStorage.removeItem('name');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('apiKey');

            window.location.href = '../index.html';

            
        });
    
        profileContainer.appendChild(banner);
        profileContainer.appendChild(avatar);
        profileContainer.appendChild(user);
        profileContainer.appendChild(logOutBtn);

    
    } catch (error) {
        console.error(error);
    }
}

getProfile();


/** fetches and rendering the profile's own posts */
async function getPostByProfile() {
    try {
        const result = await get(`/social/profiles/${name}/posts`);

        const userPost = result.data;

        userPost.forEach((userPost) => {

            const card = document.createElement('div');
            card.classList.add('card');

            if (userPost.media?.url) {
                const image = document.createElement('img');
                image.src = userPost.media.url;
                image.alt = userPost.media.alt;
                image.classList.add('post-image');
                card.appendChild(image);
            }

            const title = document.createElement('h3');
            title.textContent = userPost.title;
    
            const date = document.createElement('p');
            date.textContent = userPost.created;
    
            const body = document.createElement('p');
            body.textContent = userPost.body;

            const editBtn = document.createElement('button');
            editBtn.innerHTML = '<i class="fa-solid fa-file-pen"></i> Edit post';
            editBtn.classList.add('card-button');

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fa-solid fa-file-circle-xmark"></i> Delete post';
            deleteBtn.classList.add('card-button');
        
            card.appendChild(title);
            card.appendChild(date);
            card.appendChild(body);
            card.appendChild(editBtn);
            card.appendChild(deleteBtn);

            postContainer.appendChild(card);

            
            editBtn.addEventListener('click', () => {
                window.location.href = `./editPost.html?id=${userPost.id}`;
            })

            deleteBtn.addEventListener("click", async () => {
                const confirmed = confirm(
                  "Are you sure you want to delete this post? This action cannot be undone."
                );              
                if (!confirmed) return;
              
                try {
                const result = await del(`/social/posts/${userPost.id}`);

                card.remove();
              
                  if (!result.ok) {
                    throw new Error("Failed to delete post");
                  }
              
                } catch (error) {
                }
              });

        });
    
    } catch (error) {
    }
}

getPostByProfile();

