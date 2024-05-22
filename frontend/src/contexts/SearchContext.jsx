import React, { createContext, useContext, useState } from "react";

const SearchContext = React.createContext(undefined);

export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(
    () => sessionStorage.getItem("searchTerm") || "",
  );
  const [gymId, setGymId] = useState(
    () => sessionStorage.getItem("gymId") || "",
  );
  const [bookingDate, setBookingDate] = useState(
    () => sessionStorage.getItem("bookingDate") || new Date(),
  );
  const [startTime, setStartTime] = useState(
    () => sessionStorage.getItem("startTime") || "",
  );
  const [endTime, setEndTime] = useState(
    () => sessionStorage.getItem("endTime") || "",
  );

  const saveSearchValues = (
    searchTerm,
    bookingDate,
    startTime,
    endTime,
    gymId,
  ) => {
    setSearchTerm(searchTerm);
    bookingDate && setBookingDate(bookingDate);
    startTime && setStartTime(startTime);
    endTime && setEndTime(endTime);

    gymId && setGymId(gymId);

    sessionStorage.setItem("searchTerm", searchTerm);
    bookingDate && sessionStorage.setItem("bookingDate", bookingDate);
    startTime && sessionStorage.setItem("startTime", startTime);
    endTime && sessionStorage.setItem("endTime", endTime);

    gymId && sessionStorage.setItem("gymId", gymId);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        bookingDate,
        startTime,
        endTime,
        gymId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};
