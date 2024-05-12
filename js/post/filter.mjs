import { postsUrl, API_KEY } from "../modules/api.mjs";
import { throwError } from "../modules/errorHandler.mjs";
import { getTimestamp } from "../modules/timestamp.mjs";

const tagInput = document.getElementById("tagFilter");
const applyBtn = document.getElementById("tagBtn");
const resultContainer = document.getElementById("feedContainer");
const showError = document.getElementById("card-group");

export async function tagFilter(value) {
  const token = localStorage.getItem("accessToken");
  const url = `${postsUrl}?_tag=${value}`;
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };
  resultContainer.innerHTML = "";
  const response = await fetch(url, fetchOptions);
  const json = await response.json();

  if (!response.ok) {
    throwError(json);
    return;
  }

  const posts = json.data;
  if (posts.length === 0) {
    throwError({ message: `Could not find any posts tagged with ${value}` });
  }
  posts.forEach((post) => {
    const timestamp = getTimestamp(post.updated);
    if (post.media === null) {
      return;
    } else {
      resultContainer.innerHTML += `<div class="card col p-0 mb-3" data-post-id="${post.id}">
          <div class="card-header row justify-content-between mx-0">
            <h5 class="col">@anonymous</h5>
            <div class="col btn-group justify-content-end align-items-center">
              <i class="fa-solid fa-ellipsis" data-bs-toggle="dropdown" aria-expanded="false"></i>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><button class="dropdown-item" type="button">Edit</button></li>
                <li><button class="dropdown-item" type="button">Delete</button></li>
              </ul>
            </div>
          </div>
          <img src="${post.media.url}" class="card-img-top ch-100 ch-sm-33 ch-lg-25 object-cover border-bottom border-secondary" alt="${post.media.alt}" />
          <div class="card-body pt-0">
            <div class="row justify-content-between mb-2">
              <div class="row">
                <p class="card-text col">
                  <small class="text-muted"><i class="fa-regular fa-heart"></i> ${post._count.reactions} people liked this</small>
                </p>
              </div>
              <div class="row">
                <p class="card-text col">
                  <small class="text-muted"> <i class="fa-regular fa-comment"></i> ${post._count.comments} comments</small>
                </p>
              </div>
            </div>
            <p class="card-text">${post.title}</p>
            <p class="card-text"><small class="text-muted">${timestamp}</small></p>
          </div>
        </div>`;
    }
  });
}

applyBtn.addEventListener("click", () => {
  const input = tagInput.value.trim();
  if (input) {
    tagFilter(input);
  }
});
