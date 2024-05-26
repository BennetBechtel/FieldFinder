import { useQuery } from "react-query";
import * as apiClient from "../api-client.js";

const MyBookings = () => {
  const { data: gyms } = useQuery("fetchMyBookings", apiClient.fetchMyBookings);

  if (!gyms || gyms.length === 0) {
    return <span>Keine Buchungen gefunden</span>;
  }

  return <div className="">MyBookings</div>;
};

export default MyBookings;
