import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client.js";
import ManageGymForm from "../forms/ManageGymForm/ManageGymForm";

const EditGym = () => {
  const { gymId } = useParams();

  const { data: gym } = useQuery(
    "fetchMyGymById",
    () => apiClient.fetchMyGymById(gymId),
    {
      enabled: !!gymId,
    },
  );

  return <ManageGymForm gym={gym} />;
};

export default EditGym;
