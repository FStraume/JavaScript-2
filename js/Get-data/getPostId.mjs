import { retrieveData, API_KEY } from "../modules/api.mjs";
import { getTimestamp } from "../modules/timestamp.mjs";
import { throwError } from "../modules/errorHandler.mjs";

export async function fetchPost(event) {
  const modal = document.getElementById("postView");
  const modalContent = document.getElementById("postContent");
  const token = localStorage.getItem("accessToken");
  const post = event.target.closest(".card");
  if (post) {
    const postId = post.dataset.postId;
    const response = await fetch(`${retrieveData}/${postId}`, {
      headers: {
        "X-Noroff-API-Key": API_KEY,
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throwError(json);
    }
    const timestamp = getTimestamp(responseJson.data.updated);
    modalContent.innerHTML = `<div class="card col p-0 mb-3" data-post-id="${responseJson.data.id}">
    <div class="card-header row justify-content-between mx-0">
      <h5 class="col">@anonymous</h5>
      <div class="col btn-group justify-content-end align-items-center">
        <i class="fa-solid fa-ellipsis" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><button class="dropdown-item" type="button">Hide</button></li>
          <li><button class="dropdown-item" type="button">Block</button></li>
        </ul>
      </div>
    </div>
    <img src="${responseJson.data.media.url}" class="card-img-top ch-100 ch-sm-33 ch-lg-25 object-cover border-bottom border-secondary" alt="${responseJson.data.media.alt}" />
    <div class="card-body pt-0">
      <div class="row justify-content-between mb-2">
        <div class="row">
          <p class="card-text col">
            <small class="text-muted"><i class="fa-regular fa-heart"></i> ${responseJson.data._count.reactions} people liked this</small>
          </p>
        </div>
        <div class="row">
          <p class="card-text col">
            <small class="text-muted"> <i class="fa-regular fa-comment"></i> ${responseJson.data._count.comments} comments</small>
          </p>
        </div>
      </div>
      <p class="card-text">${responseJson.data.title}</p>
      <p class="card-text"><small class="text-muted">${timestamp}</small></p>
    </div>
  </div>`;

    new bootstrap.Modal(document.querySelector("#postView")).show();
  } else {
    throwError({ message: `Could not find any posts tagged with ${value}` });
  }
}
