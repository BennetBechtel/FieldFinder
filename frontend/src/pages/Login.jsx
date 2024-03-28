import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client.js";
import { useAppContext } from "../contexts/AppContext.jsx";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Anmeldung erfolgreich!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error) => {
      showToast(
        error.message === "Invalid Credentials"
          ? { message: "Email oder Passwort Falsch", type: "ERROR" }
          : { message: "Ein Fehler ist aufgetreten", type: "ERROR" }
      );
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="items-center h-full mt-44">
        <h1 className="text-4xl text-center mb-4">Anmelden</h1>
        <form onSubmit={onSubmit} className="max-w-md mx-auto">
          <input
            {...register("email", {
              required: "Gib deine Email-Adresse ein",
            })}
            type="email"
            placeholder="email@addresse.de"
            className="login"
          />
          {errors.email && (
            <span className="text-red-500 ml-5">{errors.email.message}</span>
          )}

          <input
            {...register("password", {
              required: "Gib ein Passwort ein",
              minLength: {
                value: 6,
                message: "Mindestens 6 Zeichen erforderlich",
              },
            })}
            type="password"
            placeholder="Passwort"
            className="login"
          />
          {errors.password && (
            <span className="text-red-500 ml-5">{errors.password.message}</span>
          )}

          <button type="submit" className="login">
            Anmelden
          </button>
          <div className="items-center text-center py-2 text-gray-500">
            Du hast noch kleinen Account?
            <Link to={"/register"} className="ml-1 text-gray-700 underline">
              Registrieren
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
