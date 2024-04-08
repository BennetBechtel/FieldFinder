import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client.js";
import { useAppContext } from "../contexts/AppContext";

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Abmeldung erfolgreich", type: "SUCCESS" });
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="hover:opacity-75 active:opacity-65"
    >
      Abmelden
    </button>
  );
};

export default LogoutButton;
