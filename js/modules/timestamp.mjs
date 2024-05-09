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
