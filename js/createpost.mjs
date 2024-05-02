//import registerUrl from "/api.js";
import { throwError } from "./modules/errorHandler.mjs";
import { createPostUrl, API_KEY } from "./modules/api.mjs";

var x = document.getElementById("form").elements[0].value;

const tilte = document.getElementById("title");
const tags = document.getElementById("tags");
const description = document.getElementById("description");
const imageUrl = document.getElementById("imageUrl");
const imageAlt = document.getElementById("imageAltText");
const button = document.getElementById("createpost");
button.addEventListener("click", getPostInfo);

function getPostInfo() {
  const postData = {
    title: tilte.value,
    body: description.value,
    tags: [tags.value],
    media: {
      url: imageUrl.value,
      alt: imageAlt.value,
    },
  };

  createPost(createPostUrl, postData);
}

async function createPost(url, data) {
  try {
    const token = localStorage.getItem("accessToken");
    const postData = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, "X-Noroff-API-Key": API_KEY },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    if (response.ok === false) {
      throwError(json);
    }
    window.location.reload();
    return json;
  } catch (error) {
    console.log(error);
  }
}
