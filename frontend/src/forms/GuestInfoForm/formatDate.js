const formatDate = (date, time) => {
  date = String(new Date(date).toISOString());
  const datePart = date.substring(0, date.indexOf("T"));
  const timePart = "T" + time + ":00.000Z";
  const output = new Date(datePart + timePart).toISOString();

  return output;
};

const parseDate = (date) => {
  const index = date.indexOf("T");
  const output = date.substring(index + 1, index + 6);

  return output;
};

export { formatDate, parseDate };
