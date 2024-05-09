import { throwError } from "../modules/errorHandler.mjs";
import { getProfile, API_KEY } from "../modules/api.mjs";
import { getPostData } from "../Get-data/getuserposts.mjs";

const userId = localStorage.getItem("userId");
const profileUrl = `${getProfile}${userId}`;
const profilePostUrl = `${getProfile}${userId}/posts`;
const profileContainer = document.querySelector("#profileData");

async function getProfileData(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, "X-Noroff-API-Key": API_KEY },
    };
    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    if (response.ok === false) {
      throwError(json);
    }
    const profileData = json.data;
    profileContainer.innerHTML += `<img src="${profileData.avatar.url}" class="rounded-circle w-33 w-md-25 w-lg-15 position-absolute top-0 start-50 translate-middle" alt="${profileData.avatar.alt}" />
                                <div class="container-fluid bg-primary pt-7">
                                <h1 class="text-center mb-5 pt-5">@${profileData.name}</h1>
                                <div class="row text-center">
                                    <div class="col-4" id="photocount">
                                     <p class="m-0 fs-3 border-bottom">${profileData._count.posts}</p>
                                     <h3>Photos</h3>
                                </div>
                                <div class="col-4" id="followers">
                                    <p class="m-0 fs-3 border-bottom">${profileData._count.followers}</p>
                                    <h3>Followers</h3>
                                </div>
                                <div class="col-4" id="following">
                                    <p class="m-0 fs-3 border-bottom">${profileData._count.following}</p>
                                    <h3>Following</h3>
                                </div>
                                </div>
                                </div>`;
    getPostData(profilePostUrl);
  } catch (error) {
    console.log(error);
    throwError(error);
  }
}

getProfileData(profileUrl);
