import { get, put } from "../service/apiClient.js";
import { getFromLocalStorage } from "../service/utils.js";

const profileContainer = document.getElementById('profile-container');
const postContainer = document.querySelector('.post-container');
const params = new URLSearchParams(window.location.search);
const author = params.get("author");

if (!author) {
  alert("No posts found");
}


async function getProfile() {
    try {
        const result = await get(`/social/profiles/${author}`);

        const profile = result.data;

        const banner = document.createElement('img');
        banner.src = profile.banner.url;
        banner.alt = profile.banner.alt;
        banner.classList.add('profile-banner');

        const profileContent = document.createElement('div');
        profileContent.classList.add('profile-content');

        const avatar = document.createElement('img');
        avatar.src = profile.avatar.url;
        avatar.alt = profile.avatar.alt;
        avatar.classList.add('avatar');

        const user = document.createElement('h1');
        user.textContent = profile.name;
        user.classList.add('profile-name');

        if (profile.bio) {
            const bio = document.createElement('p');
            bio.textContent = profile.bio;
            bio.classList.add('bio');
            profileContent.appendChild(bio);
        }

        const followers = document.createElement('p');
        followers.textContent = 'Followers: ' + profile._count.followers;
        followers.classList.add('follows');

        const following = document.createElement('p');
        following.textContent = 'Following: ' + profile._count.following;
        following.classList.add('follows');
        
        const followBtn = document.createElement('button');
        followBtn.textContent = 'Follow';
        followBtn.classList.add('follow-button');

        
        const currentUser = getFromLocalStorage('name');

        let isFollowing = profile._followers?.some(
            user => user.name === currentUser
        ) ?? false;

        followBtn.textContent = isFollowing ? 'Unfollow' : 'Follow';


        followBtn.addEventListener('click', async () => {
            try {
                followBtn.disabled = true; 
        
                if (isFollowing) {
                    await put(`/social/profiles/${author}/unfollow`);
                    isFollowing = false;
                } else {
                    await put(`/social/profiles/${author}/follow`);
                    isFollowing = true;
                }
        
                followBtn.textContent = isFollowing ? 'Unfollow' : 'Follow';
        
            } catch (error) {
                console.log(error);
            } finally {
                followBtn.disabled = false;
            }
        });
    
        profileContent.appendChild(following);
        profileContent.appendChild(followers);
        profileContent.appendChild(followBtn);

        profileContainer.appendChild(banner);
        profileContainer.appendChild(avatar);
        profileContainer.appendChild(user);
        profileContainer.appendChild(profileContent);

    
    } catch (error) {
    }
}

getProfile();



async function getPostByProfile() {
    try {
        const result = await get(`/social/profiles/${author}/posts`);

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
            date.textContent = new Date(userPost.created).toLocaleString();
    
            const body = document.createElement('p');
            body.textContent = userPost.body;
        
            card.appendChild(title);
            card.appendChild(date);
            card.appendChild(body);

            postContainer.appendChild(card);

        });
    
    } catch (error) {
    }
}

getPostByProfile();