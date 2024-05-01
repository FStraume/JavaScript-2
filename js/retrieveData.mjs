//import registerUrl from "/api.js";
import { throwError } from "./modules/errorHandler.mjs";
import { retrieveDate, API_KEY } from "./modules/api.mjs";
import { getTimeSincePost } from "./modules/date.mjs";

const itemContainer = document.querySelector("#feedContainer");

async function getApiData(url) {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, "X-Noroff-API-Key": API_KEY },
    };
    const response = await fetch(url, fetchOptions);
    console.log(response);
    const feed = await response.json();
    const posts = feed.data;
    console.log(posts);
    posts.forEach((post) => {
      const time = post.updated;
      let date1 = new Date(time);
      let date2 = new Date(Date.now());
      let Difference_In_Time = date2.getTime() - date1.getTime();
      let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
      const timestamp = Difference_In_Days;
      if (post.media === null) {
        console.log("Faen");
      } else {
        itemContainer.innerHTML += `<div class="card col p-0 mb-3">
            <img src="${post.media.url}" class="card-img-top ch-100 ch-sm-33 ch-lg-25 object-cover border-bottom border-secondary" alt="${post.media.alt}"/>
            <div class="card-body">
              <a href="#" class="card-title text-dark text-decoration-none">@TEST</a>
              <p class="card-text">${post.title}</p>
              <p class="card-text"><small class="text-muted">Comments ${post._count.comments}</small></p>
              <p class="card-text"><small class="text-muted">Likes ${post._count.reactions}</small></p>
              <p class="card-text"><small class="text-muted">Uploaded ${timestamp} days ago</small></p>
            </div>
          </div>`;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

getApiData(retrieveDate);
