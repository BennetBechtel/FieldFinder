const translate = (input) => {
  switch (input) {
    case "Monday":
      return "Montag";
    case "Tuesday":
      return "Dienstag";
    case "Wednesday":
      return "Mittwoch";
    case "Thursday":
      return "Donnerstag";
    case "Friday":
      return "Freitag";
    case "Saturday":
      return "Samstag";
    case "Sunday":
      return "Sonntag";
    case "January":
      return "Januar";
    case "February":
      return "Februar";
    case "March":
      return "März";
    case "April":
      return "April";
    case "May":
      return "Mai";
    case "June":
      return "Juni";
    case "July":
      return "Juli";
    case "August":
      return "August";
    case "September":
      return "September";
    case "October":
      return "Oktober";
    case "November":
      return "November";
    case "December":
      return "Dezember";
    default:
      return input;
  }
};

const translateDate = (input) => {
  const words = input.split(" ");
  let translatedWords = [];
  words.forEach((word) => {
    translatedWords.push(translate(word));
  });
  return translatedWords.toString().replaceAll(",", " ");
};

export default translateDate;
