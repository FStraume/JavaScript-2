const base_api_url = 'https://v2.api.noroff.dev';
const logonUrl = `${base_api_url}/auth/login`;

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const errorMsg = document.getElementById("errormsg")

function getLogonInfo() {
  const userInfo = {
    email: email.value,
    password: password.value
};

    userLogon(logonUrl, userInfo)
}

async function userLogon(url, data) {
  try {
    const postData = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(json);
    console.log(json.data.accessToken);
    const accessToken = json.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    window.location.href = "/profile/index.html";
    } 
  catch (error) {
    console.log(error)
    console.log(error.message);
    throw error;
  }
}

