//import registerUrl from "/api.js";
import { throwError } from "../modules/errorHandler.mjs";
import { registerUrl } from "../modules/api.mjs";

const regUsername = document.getElementById("regUsername");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const button = document.getElementById("createuser");
button.addEventListener("click", getRegInfo);

function getRegInfo() {
  const userInfo = {
    name: regUsername.value,
    email: regEmail.value,
    password: regPassword.value,
  };

  registerUser(registerUrl, userInfo);
}

async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    const json = await response.json();
    if (response.ok === false) {
      throwError(json);
    }

    return json;
  } catch (error) {
    console.log(error);
    throwError(error);
  }
}
