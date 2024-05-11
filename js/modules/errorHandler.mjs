const errMessage = document.getElementById("errModal");
/**
 * Displays an error on screen as a modal (only if the modal is available as HTML)
 *
 * @param {Object} error
 * @param {Array.<{message: string}>} [error.errors]
 * should have a 'message' property containing the text of the error message.
 * @param {string} [error.message] - A single error message string. This is used if there is no 'errors' array.
 *
 * @example
 * // Displaying multiple error messages using an error object with an 'errors' array
 * throwError({
 *   errors: [
 *     { message: "Invalid user input." },
 *     { message: "Failed to fetch data." }
 *   ]
 * });
 */

export function throwError(error) {
  errMessage.innerHTML = "";

  if (error.errors && error.errors.length > 0) {
    for (let i = 0; i < error.errors.length; i++) {
      const errmsg = error.errors[i];
      errMessage.innerHTML += `<p>${errmsg.message}</p>`;
    }
  } else if (error.message) {
    errMessage.innerHTML += `<p>${error.message}</p>`;
  } else {
    errMessage.innerHTML += `<p>An unknown error occurred.</p>`;
  }

  new bootstrap.Modal(document.querySelector("#errorViewer")).show();
}
