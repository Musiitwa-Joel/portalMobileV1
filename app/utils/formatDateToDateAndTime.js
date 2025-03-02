/**
 * Formats a timestamp into a readable date string.
 * @param {number} timestamp - The timestamp to format, in milliseconds.
 * @returns {string} - A formatted date string or "Invalid Date" if the input is invalid.
 */
const formatDateString = (timestamp) => {
  // Check if the timestamp is valid
  if (!timestamp || isNaN(timestamp) || timestamp <= 0) {
    return "Invalid Date";
  }

  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Ensure the Date object is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Define formatting options
  const options = {
    weekday: "short", // Abbreviated weekday name
    month: "short", // Abbreviated month name
    day: "numeric", // Day of the month
    year: "numeric", // Full year
    hour: "2-digit", // Hour (2-digit)
    minute: "2-digit", // Minute (2-digit)
    hour12: true, // Use 12-hour format
  };

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  // Return the formatted date string
  return formattedDate;
};

export default formatDateString;
