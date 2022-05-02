const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const militaryToStandardTime = (time) => {
  if (time >= 24) {
    time -= 24;
  }
  if (time === 0) {
    return "12:00 AM";
  } else if (time > 0 && time < 12) {
    return time + ":00 AM";
  } else if (time === 12) {
    return time + ":00 PM";
  } else {
    return time - 12 + ":00 PM";
  }
};
export const getJustDate = (reservation) => {
  const resDate = new Date(reservation.reservationDate);
  return weekday[resDate.getDay()] + " " + resDate.toLocaleDateString();
};
export const getTimeRange = (reservation) => {
  const resDate = new Date(reservation.reservationDate);
  return (
    militaryToStandardTime(resDate.getHours()) +
    " - " +
    militaryToStandardTime(resDate.getHours() + reservation.time)
  );
};
