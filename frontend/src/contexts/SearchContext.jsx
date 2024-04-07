import React, { createContext, useContext, useState } from "react";

const SearchContext = React.createContext(undefined);

export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gymId, setGymId] = useState("");

  const saveSearchValues = (searchTerm, gymId) => {
    setSearchTerm(searchTerm);
    gymId && setGymId(gymId);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, gymId, saveSearchValues }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};
