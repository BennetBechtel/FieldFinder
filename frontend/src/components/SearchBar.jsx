import React, { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(search.searchTerm);

  const handleSubmit = (event) => {
    event.preventDefault();
    search.saveSearchValues(searchTerm);
    navigate("/search");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        placeholder="Suchen..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-lg font-semibold transition duration-150 focus:border-gray-500 focus:outline-none"
      />
      <button className="rounded-lg bg-primary px-4 py-2 text-lg font-semibold transition duration-75 hover:opacity-85 active:opacity-75">
        Suchen
      </button>
    </form>
  );
};

export default SearchBar;
