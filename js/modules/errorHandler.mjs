const errMessage = document.getElementById("errModal");

function throwError(error) {
  // Clear previous error messages
  errMessage.innerHTML = "";

  // Loop through errors and append them
  if (error.errors && error.errors.length > 0) {
    for (let i = 0; i < error.errors.length; i++) {
      const errmsg = error.errors[i];
      errMessage.innerHTML += `<p>${errmsg.message}</p>`;
    }
  } else if (error.message) {
    // Fallback to a single error message
    errMessage.innerHTML += `<p>${error.message}</p>`;
  } else {
    // Fallback to a generic message if no error details are available
    errMessage.innerHTML += `<p>An unknown error occurred.</p>`;
  }

  // Show the error modal using Bootstrap
  new bootstrap.Modal(document.querySelector("#errorViewer")).show();
}

export { throwError };
