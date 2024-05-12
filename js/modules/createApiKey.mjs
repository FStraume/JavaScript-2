const base_api_url = "https://v2.api.noroff.dev";
const apiKeyUrl = `${base_api_url}/auth/create-api-key`;

async function createApiKey() {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(apiKeyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name: "API Key" }),
  });

  if (response.ok) {
    return await response.json();
  }

  console.error(await response.json());
  throw new Error("Fuuu");
}
