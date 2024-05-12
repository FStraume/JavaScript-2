import { postsUrl, API_KEY } from "../modules/api.mjs";

export async function deletePost(event) {
  const token = localStorage.getItem("accessToken");
  const url = `${postsUrl}/${event}`;
  const deleteOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };
  const response = await fetch(url, deleteOptions);
  if (!response.ok) {
    return;
  }
  location.reload();
}
