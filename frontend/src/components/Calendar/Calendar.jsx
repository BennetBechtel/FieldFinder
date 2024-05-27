import { Calendar as BigCalendar } from "react-big-calendar";
import moment from "moment";
import "moment/locale/de";
import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { momentLocalizer } from "react-big-calendar";
import translateDate from "./translate";

moment.locale("de", {
  week: {
    dow: 1, //Monday is the first day of the week.
  },
});

const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Ganztägig",
  previous: "<",
  next: ">",
  today: "Heute",
  month: "Monat",
  week: "Woche",
  day: "Tag",
  agenda: "Agenda",
  date: "Datum",
  time: "Zeit",
  event: "Event",
  showMore: (total) => `+ (${total}) weitere`,
};

const formats = {
  // Header Date Formats
  dayHeaderFormat: (date) =>
    translateDate(moment(date).format("dddd -  DD. MMMM")),
  dayRangeHeaderFormat: ({ start, end }) =>
    translateDate(
      moment(start).format("DD") +
        " - " +
        moment(end).format("DD") +
        " " +
        moment(start).format("MMMM"),
    ),
  monthHeaderFormat: (date) => translateDate(moment(date).format("MMMM YYYY")),
  //
  dayFormat: (date) => translateDate(moment(date).format("dddd DD.MM")),
  weekdayFormat: (date) => translateDate(moment(date).format("dddd")),
  //
  timeGutterFormat: "HH:mm",
};

const components = {
  event: {},
};

const Calendar = ({ events }) => {
  return (
    <BigCalendar
      style={{ height: "85vh" }}
      localizer={localizer}
      culture="de"
      messages={messages}
      events={events}
      defaultView={"week"}
      views={["month", "week", "day"]}
      toolbar={true}
      min={moment("2024-05-05T08:00:00").toDate()}
      max={moment("2024-05-05T23:00:00").toDate()}
      formats={formats}
    />
  );
};

export default Calendar;
