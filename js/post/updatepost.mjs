import { throwError } from "../modules/errorHandler.mjs";
import { postsUrl, API_KEY } from "../modules/api.mjs";

const modal = document.getElementById("postEdit");
const tilte = document.getElementById("posttitle");
const tags = document.getElementById("posttags");
const description = document.getElementById("postdescription");
const imageUrl = document.getElementById("postimageUrl");
const imageAlt = document.getElementById("postimageAltText");
const button = document.getElementById("updatepost");

export async function updatePost(event) {
  const token = localStorage.getItem("accessToken");
  const post = event.target.closest(".card");
  if (post) {
    const postId = post.dataset.postId;
    const response = await fetch(`${postsUrl}/${postId}`, {
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
    console.log(responseJson.data);
    tilte.value = `${responseJson.data.title}`;
    tags.value = `${responseJson.data.tags}`;
    description.value = `${responseJson.data.body}`;
    imageUrl.value = `${responseJson.data.media.url}`;
    imageAlt.value = `${responseJson.data.media.alt}`;
    new bootstrap.Modal(document.querySelector("#postEdit")).show();
  } else {
    console.log("Failed update post");
  }
}
