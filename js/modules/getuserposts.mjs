import { throwError } from "./errorHandler.mjs";
import { getProfile, API_KEY } from "./api.mjs";

const postContainer = document.querySelector("#postContainer");

async function getPostData(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    };
    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    if (!response.ok) {
      throwError(json);
    }
    const profilePosts = json.data;
    profilePosts.forEach((profilePost) => {
      const time = profilePost.updated;
      const postDate = new Date(time);
      const now = new Date();
      const timeDiff = now - postDate;
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);

      let message;

      if (hours < 1) {
        message = "Less than an hour ago";
      } else if (hours === 1) {
        message = "1 hour ago";
      } else if (hours < 24) {
        message = hours + " hours ago";
      } else if (days === 1) {
        message = "1 day ago";
      } else {
        message = days + " days ago";
      }

      const timestamp = message;
      if (!profilePost.media) return;

      postContainer.innerHTML += `        <div class="card col p-0 mb-3">
      <img src="${profilePost.media.url}" class="card-img-top ch-100 ch-sm-33 ch-lg-25 object-cover border-bottom border-secondary" alt="${profilePost.media.alt}"/>
      <div class="card-body pt-0">
        <div class="row justify-content-between">
          <div class="col">
            <p class="card-text"><small class="text-muted">Comments ${profilePost._count.comments}</small></p>
          </div>
          <div class="col">
            <p class="card-text"><small class="text-muted float-end">Likes ${profilePost._count.reactions}</small></p>
          </div>
        </div>
        <a href="#" class="card-title text-dark text-decoration-underline">@TEST</a>
        <p class="card-text">${profilePost.title}</p>
        <p class="card-text"><small class="text-muted">${timestamp}</small></p>
      </div>
    </div>`;
    });
  } catch (error) {
    console.log(error);
    throwError(error);
  }
}

export { getPostData };
