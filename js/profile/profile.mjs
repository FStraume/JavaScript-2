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

    console.log(profileData);
    profileContainer.innerHTML += `<section class="jumbotron text-center">
    <div class="container d-md-flex">
        <img src="${profileData.avatar.url}" class="rounded-circle w-25" alt="${profileData.avatar.alt}">
        <div class="d-flex flex-column justify-content-md-center">
                <h1 class="jumbotron-heading text-md-start">@${profileData.name} <i class="fa-solid fa-user-plus justify-self-center" style="font-size: 70%;"></i></h1>
            <div class="row">
                <div class="col">
                    <p class="mb-0">${profileData._count.posts}</p>
                    <h5 class="col">Posts</h5>
                </div>
                <div class="col">
                    <p class="mb-0">${profileData._count.followers}</p>
                    <h5 class="col">Followers</h5>
                </div>
                <div class="col">
                    <p class="mb-0">${profileData._count.following}</p>
                    <h5 class="col">Following</h5>
                </div>
            </div>
        </div>
    </div>
</section>`;
    getPostData(profilePostUrl);
  } catch (error) {
    console.log(error);
    throwError(error);
  }
}

getProfileData(profileUrl);
