//import registerUrl from "/api.js";
const base_api_url = 'https://v2.api.noroff.dev';
const retrieveUrl = `${base_api_url}/social/posts`;
const apiKey = "e91ec6d7-d07a-4425-a893-92bee419f551"


async function getApiData(url) {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      const fetchOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                  "X-Noroff-API-Key": apiKey,
      },
      };
    const response = await fetch(url, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
    } catch (error) {
    console.log(error)
    }
}

getApiData(retrieveUrl);
