import { useMutation } from "react-query";
import ManageGymForm from "../forms/ManageGymForm/ManageGymForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddGym = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyGym, {
    onSuccess: () => {
      showToast({ message: "Sporthalle gespeichert!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Ein Fehler ist aufgetreten", type: "ERROR" });
    },
  });

  const handleSave = (gymFormData) => {
    mutate(gymFormData);
  };

  return <ManageGymForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddGym;
