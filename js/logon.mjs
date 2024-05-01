import { throwError } from "./modules/errorHandler.mjs";
import { logonUrl } from "./modules/api.mjs";

const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("login");
button.addEventListener("click", getLogonInfo);

function getLogonInfo() {
  const userInfo = {
    email: email.value,
    password: password.value,
  };

  userLogon(logonUrl, userInfo);
}

async function userLogon(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(response.ok);
    console.log(json);
    if (response.ok === false) {
      throwError(json);
    }
    const accessToken = json.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    window.location.href = "/profile/index.html";
  } catch (err) {}
}
