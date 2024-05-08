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

  const { mutate: mutateSave, isLoading } = useMutation(
    apiClient.updateMyGymById,
    {
      onSuccess: () => {
        showToast({ message: "Sporthalle gespeichert!", type: "SUCCESS" });
        navigate("/my-gyms");
      },
      onError: () => {
        showToast({ message: "Ein Fehler ist aufgetreten", type: "ERROR" });
      },
    },
  );

  const handleSave = (gymFormData) => {
    mutateSave(gymFormData);
  };

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(
    apiClient.deleteMyGym,
    {
      onSuccess: () => {
        showToast({ message: "Sporthalle gelöscht!", type: "SUCCESS" });
        navigate("/my-gyms");
      },
      onError: () => {
        showToast({ message: "Ein Fehler ist aufgetreten", type: "ERROR" });
      },
    },
  );

  const handleDelete = (gymId) => {
    mutateDelete(gymId);
  };

  return (
    <ManageGymForm
      gym={gym}
      onSave={handleSave}
      isLoading={isLoading || isLoadingDelete}
      formType={"EditGym"}
      onDelete={handleDelete}
    />
  );
};

export default EditGym;
