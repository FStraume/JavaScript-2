import { throwError } from "./errorHandler.mjs";
import { getProfile, API_KEY } from "./api.mjs";

const postContainer = document.querySelector("#postContainer");

async function getPostData(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, "X-Noroff-API-Key": API_KEY },
    };
    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    console.log(json);
    if (response.ok === false) {
      throwError(json);
    }
    const profilePosts = json.data;
    profilePosts.forEach((profilePost) => {
      const time = profilePost.updated;
      let date1 = new Date(time);
      let date2 = new Date(Date.now());
      let Difference_In_Time = date2.getTime() - date1.getTime();
      let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
      const timestamp = Difference_In_Days;
      if (profilePost.media === null) {
        return;
      } else {
        postContainer.innerHTML += `<div class="card col p-0 mb-3">
            <img src="${profilePost.media.url}" class="card-img-top ch-100 ch-sm-33 ch-lg-25 object-cover border-bottom border-secondary" alt="${profilePost.media.alt}"/>
            <div class="card-body">
              <a href="#" class="card-title text-dark text-decoration-none">@TEST</a>
              <p class="card-text">${profilePost.title}</p>
              <p class="card-text"><small class="text-muted">Comments ${profilePost._count.comments}</small></p>
              <p class="card-text"><small class="text-muted">Likes ${profilePost._count.reactions}</small></p>
              <p class="card-text"><small class="text-muted">Uploaded ${timestamp} days ago</small></p>
            </div>
          </div>`;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export { getPostData };
