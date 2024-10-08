import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client.js";
import { useAppContext } from "../contexts/AppContext.jsx";

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Registrierung erfolgreich!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error) => {
      showToast(
        error.message === "User already exists"
          ? { message: "Benutzer existiert bereits", type: "ERROR" }
          : { message: "Ein Fehler ist aufgetreten", type: "ERROR" },
      );
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="mt-4 flex grow items-center justify-around">
      <div className="mt-44 h-full items-center px-3">
        <h1 className="mb-4 text-center text-4xl">Registrieren</h1>
        <form onSubmit={onSubmit} className="mx-auto max-w-md">
          <input
            {...register("firstName", {
              required: "Geben Sie Ihren Vornamen an",
            })}
            type="text"
            placeholder="Vorname"
            className="login"
          />
          {errors.firstName && (
            <span className="input-error-message">
              {errors.firstName.message}
            </span>
          )}

          <input
            {...register("lastName", {
              required: "Geben Sie Ihren Nachnamen an",
            })}
            type="text"
            placeholder="Nachname"
            className="login"
          />
          {errors.lastName && (
            <span className="input-error-message">
              {errors.lastName.message}
            </span>
          )}

          <input
            {...register("email", {
              required: "Geben Sie Ihre Email-Adresse an",
            })}
            type="email"
            placeholder="email@adresse.de"
            className="login"
          />
          {errors.email && (
            <span className="input-error-message">{errors.email.message}</span>
          )}

          <input
            {...register("password", {
              required: "Geben Sie ein Passwort an",
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
            <span className="input-error-message">
              {errors.password.message}
            </span>
          )}
          <button type="submit" className="login">
            Registrieren
          </button>
          <div className="items-center py-2 text-center text-gray-500">
            Du hast bereits einen Account?
            <Link to={"/login"} className="ml-1 text-gray-700 underline">
              Anmelden
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
