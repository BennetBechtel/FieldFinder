import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client.js";

const Detail = () => {
  const { gymId } = useParams();

  const { data: gym } = useQuery(
    "fetchGymById",
    () => apiClient.fetchGymById(gymId),
    {
      enabled: !!gymId,
    },
  );

  console.log(gym);

  return (
    <div>
      <div className="flex flex-col p-5">
        <span>{gymId}</span>
        <span>{gym?.name}</span>
      </div>
    </div>
  );
};

export default Detail;
