import { throwError } from "../modules/errorHandler.mjs";
import { getProfile, API_KEY } from "../modules/api.mjs";
import { getTimestamp } from "../modules/timestamp.mjs";
import { updatePost } from "../post/updatepost.mjs";
import { deletePost } from "../post/deletepost.mjs";

const postContainer = document.querySelector("#postContainer");

async function getPostData(url) {
  try {
    const userId = localStorage.getItem("userId");
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
      const timestamp = getTimestamp(profilePost.updated);
      if (!profilePost.media) return;
      postContainer.innerHTML += `<div class="card col p-0 mb-3" data-post-id="${profilePost.id}">
      <div class="card-header row justify-content-between mx-0">
        <h5 class="col">@${userId}</h5>
        <div class="col btn-group justify-content-end align-items-center">
          <i class="fa-solid fa-ellipsis" data-bs-toggle="dropdown" aria-expanded="false"></i>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><button class="dropdown-item edit-btn" type="button">Edit</button></li>
            <li><button class="dropdown-item delete-btn" type="button">Delete</button></li>
          </ul>
        </div>
      </div>
      <img src="${profilePost.media.url}" class="card-img-top ch-100 ch-sm-33 ch-lg-25 object-cover border-bottom border-secondary" alt="${profilePost.media.alt}" />
      <div class="card-body pt-0">
        <div class="row justify-content-between mb-2">
          <div class="row">
            <p class="card-text col">
              <small class="text-muted"><i class="fa-regular fa-heart"></i> ${profilePost._count.reactions} people liked this</small>
            </p>
          </div>
          <div class="row">
            <p class="card-text col">
              <small class="text-muted"> <i class="fa-regular fa-comment"></i> ${profilePost._count.comments} comments</small>
            </p>
          </div>
        </div>
        <p class="card-text">${profilePost.title}</p>
        <p class="card-text"><small class="text-muted">${timestamp}</small></p>
      </div>
    </div>`;
    });

    postContainer.removeEventListener("click", handleCardClick);
    postContainer.addEventListener("click", handleCardClick);

    function handleCardClick(event) {
      const target = event.target;

      if (target.classList.contains("edit-btn")) {
        const card = target.closest(".card");
        const postId = card.getAttribute("data-post-id");
        updatePost(postId);
      }

      if (target.classList.contains("delete-btn")) {
        const card = target.closest(".card");
        const postId = card.getAttribute("data-post-id");
        if (confirm("Are you sure you want to delete this post?")) {
          deletePost(postId);
        }
      }
    }
  } catch (error) {
    throwError(error);
  }
}

export { getPostData };
