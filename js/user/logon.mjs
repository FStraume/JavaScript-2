import { throwError } from "../modules/errorHandler.mjs";
import { logonUrl } from "../modules/api.mjs";

const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("login");
button.addEventListener("click", getLogonInfo);

/**
 * Attaches an event listener to the login button that triggers the user login process.
 * When the button is clicked, it gathers the user's email and password from input fields
 * and passes them to the `userLogon` function.
 * @param {string} data.email - The user's email address.
 * @param {string} data.password - The user's password.
 */
function getLogonInfo() {
  const userInfo = {
    email: email.value,
    password: password.value,
  };

  userLogon(logonUrl, userInfo);
}

/**
 * Handles the user login by sending the user's credentials to the Noroff API.
 * If the login is successful, it stores the user's access token and user ID in localStorage and redirects to the profile page.
 * If the login fails, it displays an error using the `throwError` function.
 *
 * @param {string} url - the Noroff API Url
 * @param {Object} data - An object containing the user's login information colected by the getLogonInfo()
 */
async function userLogon(url, data) {
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
    const accessToken = json.data.accessToken;
    const userId = json.data.name;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userId", userId);

    window.location.href = "/profile/index.html";
  } catch (err) {}
}
