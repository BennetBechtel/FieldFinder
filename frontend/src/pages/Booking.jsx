import { useQuery } from "react-query";
import * as apiClient from "../api-client.js";
import BookingForm from "../forms/BookingForm/BookingForm.jsx";
import BookingDetailsSummary from "../forms/BookingForm/BookingDetailsSummary.jsx";
import { useSearchContext } from "../contexts/SearchContext.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Booking = () => {
  const search = useSearchContext();
  const { gymId } = useParams();

  const [numberOfHours, setNumberOfHours] = useState(0);

  useEffect(() => {
    if (search.startTime && search.endTime) {
      const hours =
        Math.abs(
          new Date(search.endTime).getTime() -
            new Date(search.startTime).getTime(),
        ) /
        (60 * 60 * 1000);
      setNumberOfHours(Math.ceil(hours));
    }
  }, [search.startTime, search.endTime]);

  const { data: gym } = useQuery(
    "fetchGymByID",
    () => apiClient.fetchGymById(gymId),
    {
      enabled: !!gymId,
    },
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
  );

  return (
    // <div className="mx-auto mt-10 flex h-1 max-w-6xl grow flex-col px-5">
    <div className="mx-auto mt-5 flex min-h-1 max-w-6xl grow flex-col gap-5 px-3 md:mt-10 md:px-5">
      <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
        <BookingDetailsSummary
          bookingDate={search.bookingDate}
          startTime={search.startTime}
          endTime={search.endTime}
          numberOfHours={numberOfHours}
          gym={gym}
        />
        {currentUser && (
          <BookingForm
            currentUser={currentUser}
            gymId={gymId}
            numberOfHours={numberOfHours}
            pricePerHour={gym?.pricePerHour}
            bookings={gym?.bookings}
          />
        )}
      </div>
    </div>
  );
};

export default Booking;
