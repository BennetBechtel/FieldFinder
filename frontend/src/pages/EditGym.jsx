import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client.js";
import { useAppContext } from "../contexts/AppContext.jsx";
import ManageGymForm from "../forms/ManageGymForm/ManageGymForm";

const EditGym = () => {
  const { gymId } = useParams();

  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { data: gym } = useQuery(
    "fetchMyGymById",
    () => apiClient.fetchMyGymById(gymId),
    {
      enabled: !!gymId,
    },
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyGymById, {
    onSuccess: () => {
      showToast({ message: "Sporthalle gespeichert!", type: "SUCCESS" });
      navigate("/my-gyms");
    },
    onError: () => {
      showToast({ message: "Ein Fehler ist aufgetreten", type: "ERROR" });
    },
  });

  const handleSave = (gymFormData) => {
    mutate(gymFormData);
  };

  return <ManageGymForm gym={gym} onSave={handleSave} isLoading={isLoading} />;
};

export default EditGym;
