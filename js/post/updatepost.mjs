import { postsUrl, API_KEY } from "../modules/api.mjs";
import { throwError } from "../modules/errorHandler.mjs";

const title = document.getElementById("posttitle");
const tags = document.getElementById("posttags");
const description = document.getElementById("postdescription");
const imageUrl = document.getElementById("postimageUrl");
const imageAlt = document.getElementById("postimageAltText");
const updateBtn = document.getElementById("updatepost");
let postId = null;

export async function updatePost(event) {
  postId = event;
  const token = localStorage.getItem("accessToken");
  const url = `${postsUrl}/${postId}`;
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
    return;
  }
  console.log(json);

  title.value = json.data.title;
  tags.value = json.data.tags;
  description.value = json.data.body;
  imageUrl.value = json.data.media.url;
  imageAlt.value = json.data.media.alt;

  new bootstrap.Modal(document.querySelector("#postEdit")).show();
}

function fetchPostData() {
  return {
    title: title.value,
    body: description.value,
    tags: [tags.value],
    media: {
      url: imageUrl.value,
      alt: imageAlt.value,
    },
  };
}

export async function pushPost() {
  const data = fetchPostData();
  const token = localStorage.getItem("accessToken");
  const url = `${postsUrl}/${postId}`;
  console.log(data);

  const updateOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, "X-Noroff-API-Key": API_KEY },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, updateOptions);
  const json = await response.json();
  if (!response.ok) {
    console.log(response);
    return;
  }
  console.log(json);

  location.reload();
}

updateBtn.removeEventListener("click", pushPost);
updateBtn.addEventListener("click", pushPost);
