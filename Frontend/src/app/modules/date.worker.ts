/**
 * A given timpestamp will look like this : "2023-01-17 09:25:33.006+00"
 */
const dateRegex =
  /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})\.(\d{3})\+(\d{2})/;

const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
/**
 * Converts a timestamp to a date object
 * @param timeStamp
 * @returns
 */
const timeStampToDate = (timeStamp: string) => {
  // @ts-ignore
  const [_, year, month, day, hour, minute, second, millisecond] =
    timeStamp.match(dateRegex);
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
    Number(millisecond)
  );
};
/**
 * Converts a timestamp to a readable date
 * @param timeStamp
 * @returns Monday 17 January 2023 09:25:33
 */
const timestampToReadable = (timeStamp: string) => {
  const date = timeStampToDate(timeStamp);
  return `${Days[date.getDay()]} ${date.getDate()} ${
    Months[date.getMonth()]
  } ${date.getFullYear()} ${date.toLocaleTimeString()}`;
};
