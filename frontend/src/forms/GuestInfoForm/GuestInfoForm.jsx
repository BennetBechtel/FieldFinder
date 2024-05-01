import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GuestInfoForm = ({ gymId, pricePerHour }) => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="flex flex-col gap-4 bg-slate-300 p-4">
      <h3 className="text-md font-bold">{pricePerHour}€</h3>
      <form>
        <div className="grid grid-cols-1 items-center gap-4">
          <div>
            {[
              "Montag",
              "Dienstag",
              "Mittwoch",
              "Donnerstag",
              "Freitag",
              "Samstag",
              "Sonntag",
            ].map((day, index) => (
              <label key={index}>
                {day}
                <input type="radio" name="day" />
              </label>
            ))}
          </div>

          <div></div>

          <div>
            <DatePicker
              required
              selected={startDate}
              onChange={(date) => setValue("startDate", date)}
              startDate={startDate}
              endDate={endDate}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Start Datum"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          <div>
            <DatePicker
              required
              selected={endDate}
              onChange={(date) => setValue("endDate", date)}
              startDate={startDate}
              endDate={endDate}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="End Datum"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
