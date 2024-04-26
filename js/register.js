//import registerUrl from "/api.js";

const base_api_url = 'https://v2.api.noroff.dev';
const registerUrl = `${base_api_url}/auth/register`;
  
  const regUsername = document.getElementById("regUsername");
  const regEmail = document.getElementById("regEmail");
  const regPassword = document.getElementById("regPassword");


function getRegInfo() {
  

  const userInfo = {
    name: regUsername.value,
    email: regEmail.value,
    password: regPassword.value
};

    registerUser(registerUrl, userInfo)
}

async function registerUser(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
    } 
  catch (error) {
    console.log(error);
  }
}



