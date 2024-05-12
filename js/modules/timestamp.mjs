/**
 * Calculates time since post was created/updated and turns it in to a readable format, calculating how many hours/days have pased since the post was created.
 *
 * @param {string} dtg - The date and time in string format - from the API
 * @returns {string} Returns a string, calculated from then to now
 *     It can be "Less than an hour ago", "1 day ago" and so on.
 *
 * @example
 * // If the current time is "May 6, 2024 14:59:59", this will return "1 day ago"
 * getTimestamp("May 5, 2024 14:59:59"));
 */

export function getTimestamp(dtg) {
  const postDate = new Date(dtg);
  const now = new Date();
  const timeDiff = now - postDate;
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  let time;

  if (hours < 1) {
    time = "Less than an hour ago";
  } else if (hours === 1) {
    time = "1 hour ago";
  } else if (hours < 24) {
    time = hours + " hours ago";
  } else if (days === 1) {
    time = "1 day ago";
  } else {
    time = days + " days ago";
  }

  return time;
}
