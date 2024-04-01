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
          : { message: "Ein Fehler ist aufgetreten", type: "ERROR" },
      );
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="mt-4 flex grow items-center justify-around">
      <div className="mt-44 h-full items-center">
        <h1 className="mb-4 text-center text-4xl">Anmelden</h1>
        <form onSubmit={onSubmit} className="mx-auto max-w-md">
          <input
            {...register("email", {
              required: "Gib deine Email-Adresse ein",
            })}
            type="email"
            placeholder="email@addresse.de"
            className="login"
          />
          {errors.email && (
            <span className="ml-5 text-red-500">{errors.email.message}</span>
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
            <span className="ml-5 text-red-500">{errors.password.message}</span>
          )}

          <button type="submit" className="login">
            Anmelden
          </button>
          <div className="items-center py-2 text-center text-gray-500">
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
