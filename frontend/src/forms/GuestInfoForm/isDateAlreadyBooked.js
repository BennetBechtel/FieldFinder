const correctDate = (date) => {
  // 2024-05-26T11:00:00.000Z
  const start = date.substring(0, date.indexOf("T") + 1);
  let time = String(
    Number(date.substring(date.indexOf("T") + 1, date.indexOf("T") + 3)) - 2,
  );
  if (time < 10) {
    time = "0" + time;
  }
  const end = date.substring(date.indexOf("T") + 3, date.length);

  const output = start + time + end;
  return output;
};

const isDateAlreadyBooked = (start, end, events) => {
  const newStart = new Date(correctDate(start));
  const newEnd = new Date(correctDate(end));

  for (const event of events) {
    const existingStart = new Date(event.start);
    const existingEnd = new Date(event.end);

    if (newStart < existingEnd && newEnd > existingStart) {
      return true; // There is an overlap
    }
  }
  return false; // No overlap found
};

export default isDateAlreadyBooked;
