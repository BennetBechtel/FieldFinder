import { Link } from "react-router-dom";

const SearchResultCard = ({ gym }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-neutral-100 lg:flex-row">
      <section className="h-60 overflow-hidden lg:w-60">
        <img src={gym.imageUrls[0]} className="h-60 w-full object-cover" />
      </section>

      <section className="p-3">
        <h2>{gym.name}</h2>
        <h3>{gym.address}</h3>
        <h4>
          {gym.zipCode}, {gym.city}
        </h4>
        <button>Ansehen</button>
      </section>
    </div>
  );
};

export default SearchResultCard;
