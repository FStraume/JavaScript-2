const errMessage = document.getElementById("errModal");

function throwError(error) {
  for (let i = 0; i < error.errors.length; i++) {
    const errmsg = error.errors[i];
    errMessage.innerHTML += errmsg.message;
  }
  new bootstrap.Modal(document.querySelector("#errorViewer")).show();
}

export { throwError };
