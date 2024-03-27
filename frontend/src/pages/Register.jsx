import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-clients.js";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      console.log("registration successful");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="items-center h-full mt-44">
        <h1 className="text-4xl text-center mb-4">Registrieren</h1>
        <form className="max-w-md mx-auto" onSubmit={onSubmit}>
          <input
            {...register("firstName", {
              required: "Gib deinen Vornamen ein",
            })}
            type="text"
            placeholder="Vorname"
            className="login"
          />
          {errors.firstName && (
            <span className="text-red-500 ml-5">
              {errors.firstName.message}
            </span>
          )}

          <input
            {...register("lastName", {
              required: "Gib deinen Nachnamen ein",
            })}
            type="text"
            placeholder="Nachname"
            className="login"
          />
          {errors.lastName && (
            <span className="text-red-500 ml-5">{errors.lastName.message}</span>
          )}

          <input
            {...register("email", {
              required: "Gib deine Email-Adresse ein",
              validate: (value) => {
                const isValid = value
                  .toLowerCase()
                  .match(
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                  );
                if (!isValid) {
                  return "Ungültige Email-Adresse";
                }
              },
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
            Registrieren
          </button>
          <div className="items-center text-center py-2 text-gray-500">
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
