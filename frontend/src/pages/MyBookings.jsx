import { useQuery } from "react-query";
import * as apiClient from "../api-client.js";
import { Link } from "react-router-dom";
import { format, parseISO, isAfter, startOfDay } from "date-fns";

const MyBookings = () => {
  const { data: gyms } = useQuery("fetchMyBookings", apiClient.fetchMyBookings);

  if (!gyms || gyms.length === 0) {
    return <span>Keine Buchungen gefunden</span>;
  }

  const today = startOfDay(new Date());

  const formatDate = (date) => {
    date = new Date(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
  };

  const formatTime = (time) => {
    return time.substring(time.indexOf("T") + 1, time.indexOf("T") + 6);
  };

  let bookings = gyms.map((gym) => {
    const bookings = gym.bookings.map((booking) => {
      return { ...booking, gymId: gym._id };
    });
    return bookings;
  });
  bookings = bookings.flat(1);
  bookings.sort((a, b) => {
    const keyA = new Date(a.startTime);
    const keyB = new Date(b.startTime);
    // Compare the starting times
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  const filteredBookings = bookings.filter((booking) =>
    isAfter(parseISO(booking.bookingDate), today),
  );

  const groupedBookings = filteredBookings.reduce((acc, booking) => {
    const date = formatDate(booking.bookingDate);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(booking);
    return acc;
  }, {});

  return (
    <>
      <div className="mt-5 flex grow flex-col px-5 lg:px-10">
        <span className="mb-5">
          <h1 className="text-3xl font-bold">Meine Buchungen</h1>
        </span>

        <div className="w-full space-y-8">
          {Object.keys(groupedBookings).map((date) => (
            <div key={date}>
              <div className="mb-4 text-3xl font-bold text-gray-800">
                {date}
              </div>
              {groupedBookings[date].map((booking, index) => {
                const gym = gyms.find(
                  (gym) => gym._id.toString() === booking.gymId.toString(),
                );

                return (
                  <div
                    key={index}
                    className="mx-1 mb-4 transform rounded-lg border-[1px] border-l-4 border-gray-300 border-l-orange-500 bg-slate-50 px-5 py-4 shadow-md"
                  >
                    <div className="mb-2 text-xl font-bold text-gray-700">
                      {formatTime(booking.startTime)} -{" "}
                      {formatTime(booking.endTime)}
                    </div>
                    <Link
                      className="text-lg font-medium text-gray-700"
                      to={`/detail/${gym._id}`}
                    >
                      {gym.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBookings;
