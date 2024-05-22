import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client.js";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm.jsx";
import Calendar from "../components/Calendar/Calendar.jsx";

const Detail = () => {
  const { gymId } = useParams();

  const { data: gym } = useQuery(
    "fetchGymById",
    () => apiClient.fetchGymById(gymId),
    {
      enabled: !!gymId,
    },
  );

  if (!gym) {
    return <></>;
  }

  return (
    <div className="flex min-h-1 grow flex-col gap-5 px-3 md:px-5">
      <h1 className="mt-3 text-center text-4xl font-bold md:text-start">
        {gym.name}
      </h1>

      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
        {gym.imageUrls.map((url, index) => (
          <div key={index} className="max-h-[450px] min-h-fit">
            <img
              src={url}
              alt={gym.name}
              className="h-full w-full rounded-md object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[2fr_1fr]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <section>
            <h2 className="mb-3 text-3xl font-bold">Sportarten</h2>
            <span className="flex w-full flex-col gap-1">
              {gym.sports.map((sport, index) => (
                <div
                  key={index}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-lg font-medium"
                >
                  {sport}
                </div>
              ))}
            </span>
          </section>

          <section>
            <h2 className="mb-3 text-3xl font-bold">Ausstattung</h2>
            <span className="flex w-full flex-col gap-1">
              {gym.equipment.map((equip, index) => (
                <div
                  key={index}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-lg font-medium"
                >
                  {equip}
                </div>
              ))}
            </span>
          </section>
        </div>

        <span>
          <h2 className="mb-3 text-3xl font-bold">Buchen</h2>
          <GuestInfoForm pricePerHour={gym.pricePerHour} />
        </span>
      </div>

      <section className="mt-10 hidden h-[80vh] lg:inline">
        <Calendar events={gym?.bookings} />
      </section>
    </div>
  );
};

export default Detail;
