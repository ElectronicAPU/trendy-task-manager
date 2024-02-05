export default function formattedDate(date) {
  const newDate = new Date(date);

  const dateFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  // Format date and time using the options
  const formattedDate = newDate.toLocaleDateString(undefined, dateFormatOptions);
  const formattedTime = newDate.toLocaleTimeString(undefined, timeFormatOptions);

  // Combine formatted date and time
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
}
