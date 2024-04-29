//import registerUrl from "/api.js";
const base_api_url = 'https://v2.api.noroff.dev';
const retrieveUrl = `${base_api_url}/social/posts`;
const apiKey = "e91ec6d7-d07a-4425-a893-92bee419f551"

const itemContainer = document.querySelector("#feedContainer")


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
    const feed = await response.json();
    const posts = feed.data;
    console.log(posts)    
    posts.forEach(post => {
      const time = post.updated;
      let date1 = new Date(time);
      let date2 = new Date(Date.now());
      let Difference_In_Time = date2.getTime() - date1.getTime();
      let Difference_In_Days = Math.round (Difference_In_Time / (1000 * 3600 * 24));
      const timestamp = Difference_In_Days;
      if (post.media === null) {
              itemContainer.innerHTML += 
            `<div class="card col p-0 mb-3">
              <div class="card-body">
              <a href="#" class="card-title text-dark text-decoration-none">TEST</a>
              <p class="card-text">${post.title}</p>
              <p class="card-text"><small class="text-muted">Uploaded ${timestamp} days ago</small></p>
            </div>
          </div>`
      } else {
      itemContainer.innerHTML += 
      `<div class="card col p-0 mb-3">
            <img src="${post.media.url}" class="card-img-top ch-100 ch-sm-33 ch-lg-25 object-cover border-bottom border-secondary"/>
            <div class="card-body">
              <a href="#" class="card-title text-dark text-decoration-none">@TEST</a>
              <p class="card-text">${post.title}</p>
              <p class="card-text"><small class="text-muted">Uploaded ${timestamp} days ago</small></p>
            </div>
          </div>`
      }
    });
    } 
    catch (error) {
    console.log(error)
    }
}

getApiData(retrieveUrl);

