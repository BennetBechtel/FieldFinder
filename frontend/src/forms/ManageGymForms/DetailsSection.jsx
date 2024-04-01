import React from "react";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grow flex-col gap-4">
      <h1 className="mb-3 text-3xl font-bold">Sporthalle Hinzufügen</h1>
      <input
        {...register("name", {
          required: "Feld ausfüllen",
        })}
        type="text"
        placeholder="Name"
        className="login"
      />
      {errors.name && (
        <span className="ml-5 text-red-500">{errors.name.message}</span>
      )}

      <input
        {...register("zipCode", {
          required: "Feld ausfüllen",
        })}
        type="text"
        placeholder="PLZ"
        className="login"
      />
      {errors.zipCode && (
        <span className="ml-5 text-red-500">{errors.zipCode.message}</span>
      )}

      <input
        {...register("city", {
          required: "Feld ausfüllen",
        })}
        type="text"
        placeholder="Stadt"
        className="login"
      />
      {errors.city && (
        <span className="ml-5 text-red-500">{errors.city.message}</span>
      )}

      <input
        {...register("address", {
          required: "Feld ausfüllen",
        })}
        type="text"
        placeholder="Adresse"
        className="login"
      />
      {errors.address && (
        <span className="ml-5 text-red-500">{errors.address.message}</span>
      )}
    </div>
  );
};

export default DetailsSection;
