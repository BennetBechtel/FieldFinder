import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client.js";
import { useAppContext } from "../contexts/AppContext";

const MyGyms = () => {
  const { showToast } = useAppContext();
  const { data: gymData } = useQuery("fetchMyGyms", apiClient.fetchMyGyms, {
    onError: () => {
      showToast({ message: "Ein Fehler ist aufgetreten", type: "ERROR" });
    },
  });

  if (!gymData) {
    return <span>Keine Sporthallen gefunden</span>;
  }

  return (
    <div className="mx-10 mb-5 mt-5 flex grow flex-col">
      <span className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meine Sporthallen</h1>
        <Link
          to={"/add-gym"}
          className="rounded-2xl bg-primary px-4 py-3 text-xl font-bold duration-75 hover:opacity-85"
        >
          Sporthalle Hinzufügen
        </Link>
      </span>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        {gymData.map((gym, index) => (
          <div
            key={index}
            className="flex flex-row gap-5 rounded-2xl border bg-gray-200"
          >
            <section className="w-44 overflow-hidden rounded-2xl">
              <img
                src={gym.imageUrls[0]}
                alt={gym.name}
                className="h-44 object-cover"
              />
            </section>
            <section className="flex grow flex-col py-5">
              <h2 className="text-2xl font-semibold">{gym.name}</h2>
              <p className="text-lg">{gym.address}</p>
              <p className="text-base">
                {gym.zipCode}, {gym.city}
              </p>
              <p className="mt-5">€{gym.pricePerHour} pro Stunde</p>
            </section>
            <section className="m-2 flex flex-col justify-end">
              <Link
                to={`/edit-gym/${gym._id}`}
                className="rounded-xl border bg-primary px-3 py-2 font-semibold duration-75 hover:opacity-85"
              >
                Bearbeiten
              </Link>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGyms;
