const formatDate = (date, time) => {
  date = String(new Date(date).toISOString());
  const datePart = date.substring(0, date.indexOf("T"));
  const timePart = "T" + time + ":00.000Z";
  const output = new Date(datePart + timePart).toISOString();

  return output;
};

const germanDateFormat = (date) => {
  const formatDate = new Date();
  const yyyy = formatDate.getFullYear();
  let mm = formatDate.getMonth() + 1; // Months start at 0!
  let dd = formatDate.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const output = dd + "/" + mm + "/" + yyyy;

  return output;
};

const parseDate = (date) => {
  const index = date.indexOf("T");
  const output = date.substring(index + 1, index + 6);

  return output;
};

export { formatDate, parseDate, germanDateFormat };
