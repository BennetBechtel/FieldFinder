import React from "react";

const Search = () => {
  return (
    <form className="flex bg-zinc-100 py-3 px-4 rounded-2xl items-center">
      <input
        type="text"
        placeholder="Suchen..."
        className="bg-transparent focus:outline-none"
      />
      <FaSearch />
    </form>
  );
};

export default Search;
