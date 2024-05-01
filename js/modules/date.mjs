function getTimeSincePost(postTime) {
  // Get the current time as a Date object
  const now = new Date();

  // Assuming postTime is a Date object
  // Calculate the difference in milliseconds
  const diff = now - postTime;

  // Convert milliseconds to hours
  const hours = diff / (1000 * 60 * 60);

  if (hours < 24) {
    // If less than 24 hours, return the number of hours
    return Math.floor(hours) + " hour(s) ago";
  } else {
    // Otherwise, convert hours to days and return the number of days
    const days = hours / 24;
    return Math.floor(days) + " day(s) ago";
  }
}

export { getTimeSincePost };
