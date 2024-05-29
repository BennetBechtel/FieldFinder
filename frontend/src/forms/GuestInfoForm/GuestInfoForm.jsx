import { useAppContext } from "../../contexts/AppContext";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker"; /* CSS Import */
import "./GuestInfoForm.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate, parseDate } from "./formatDate";
import { useSearchContext } from "../../contexts/SearchContext";
import isDateAlreadyBooked from "./isDateAlreadyBooked";

const GuestInfoForm = ({ gymId, pricePerHour, events }) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { showToast } = useAppContext();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bookingDate: search.bookingDate,
      startTime: parseDate(search.startTime),
      endTime: parseDate(search.endTime),
    },
  });

  const bookingDate = watch("bookingDate");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const availableTimes = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  const onSignInClick = (data) => {
    const date = new Date(data.bookingDate).toISOString();
    const start = formatDate(date, data.startTime);
    const end = formatDate(date, data.endTime);
    search.saveSearchValues("", data.bookingDate, start, end);

    navigate("/login", { state: { from: location } });
  };

  const onSubmit = (data) => {
    const date = new Date(data.bookingDate).toISOString();
    const start = formatDate(date, data.startTime);
    const end = formatDate(date, data.endTime);

    if (isDateAlreadyBooked(start, end, events)) {
      showToast({
        message: "Zeitraum nicht verfügbar",
        type: "ERROR",
      });
    } else {
      search.saveSearchValues("", data.bookingDate, start, end);
      navigate(`/gym/${gymId}/booking`);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-gray-300 p-4">
      <h3 className="text-md font-bold">{pricePerHour}€ pro Stunde</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 items-center gap-4">
          <div>
            <DatePicker
              dateFormat="dd.MM.yyyy"
              required
              selected={bookingDate}
              onChange={(date) => setValue("bookingDate", date)}
              startDate={bookingDate}
              endDate={bookingDate}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Wähle ein Datum"
              className="w-full rounded-md bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="border-b border-slate-300">
              <select
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="w-full rounded-md border p-2"
                {...register("startTime", {
                  required: "Feld ausfüllen",
                })}
              >
                <option value="">Start Uhrzeit</option>
                {availableTimes.map((time, startTimeIndex) => (
                  <option key={startTimeIndex} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.startTime && (
                <span className="input-error-message">
                  {errors.startTime.message}
                </span>
              )}
            </div>

            <div className="border-b border-slate-300">
              <select
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="w-full rounded-md border p-2"
                {...register("endTime", {
                  required: "Feld ausfüllen",
                  validate: (value, formValues) =>
                    availableTimes.indexOf(formValues.startTime) <
                      availableTimes.indexOf(value) || "Ungültige Uhrzeit",
                })}
              >
                <option value="">End Uhrzeit</option>
                {availableTimes.map((time, endTimeIndex) => (
                  <option key={endTimeIndex} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.endTime && (
                <span className="input-error-message">
                  {errors.endTime.message}
                </span>
              )}
            </div>
          </div>

          {isLoggedIn ? (
            <button className="gym-form">Buchen</button>
          ) : (
            <button className="gym-form" type="submit" value="Submit">
              Anmelden zum Buchen
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
