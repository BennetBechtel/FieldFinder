import { Link } from "react-router-dom";

const SearchResultCard = ({ gym }) => {
  return (
    <>
      <div className="relative max-w-full overflow-hidden rounded-lg bg-white shadow-md">
        <Link to={`/detail/${gym._id}`}>
          <img
            src={gym.imageUrls[0]}
            alt={gym.name}
            className="h-64 w-full object-cover"
          />
        </Link>
        <div className="p-4">
          <h2 className="text-2xl font-semibold">{gym.name}</h2>
          <p className="mt-2 text-lg font-medium text-gray-600">
            {gym.address}
          </p>
          <p className="font-base -mt-1 text-base text-gray-600">
            {gym.zipCode}, {gym.city}
          </p>

          <div className="mb-8 mt-3 flex-row items-center gap-1">
            <span className="flex gap-1">
              {gym.sports.slice(0, 3).map((sport, index) => (
                <span
                  key={index}
                  className="text-md rounded-xl border bg-neutral-300 px-2 py-1 font-medium"
                >
                  {sport}
                </span>
              ))}
            </span>

            <span className="text-md font-base text-gray-500">
              {gym.sports.length > 3 &&
                (gym.sports.length - 3 === 1 ? (
                  <p className="m-1">{`+ ${gym.sports.length - 3} weiterer`}</p>
                ) : (
                  <p className="m-1">{`+ ${gym.sports.length - 3} weitere`}</p>
                ))}
            </span>
          </div>

          <span className="text-md absolute bottom-3 left-4 font-semibold text-gray-600">
            {gym.pricePerHour}€ pro Stunde
          </span>

          <Link
            to={`/detail/${gym._id}`}
            className="absolute bottom-2 right-2 rounded-md bg-primary px-4 py-2 font-semibold transition duration-75 hover:opacity-85 active:opacity-75"
          >
            Ansehen
          </Link>
        </div>
      </div>
    </>
  );
};

export default SearchResultCard;
