import React from "react";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <span className="text-center sm:text-start">
        <h1 className="mb-6 text-3xl font-bold">Sporthalle Hinzufügen</h1>
      </span>

      <label className="gym-form">
        Name der Sporthalle:
        <input
          type="text"
          className="gym-form"
          {...register("name", {
            required: "Geben Sie den Namen der Sporthalle an",
          })}
        />
        {errors.name && (
          <span className="input-error-message">{errors.name.message}</span>
        )}
      </label>

      <span className="flex flex-row gap-1">
        <label className="gym-form">
          Postleitzahl:
          <input
            type="text"
            className="gym-form"
            {...register("zipCode", {
              required: "Geben Sie die Postleitzahl an",
            })}
          />
          {errors.zipCode && (
            <span className="input-error-message">
              {errors.zipCode.message}
            </span>
          )}
        </label>

        <label className="gym-form">
          Stadt:
          <input
            type="text"
            className="gym-form"
            {...register("city", { required: "Geben Sie die Stadt an" })}
          />
          {errors.city && (
            <span className="input-error-message">{errors.city.message}</span>
          )}
        </label>
      </span>

      <label className="gym-form">
        Adresse:
        <input
          type="text"
          className="gym-form"
          {...register("address", { required: "Geben Sie die Adresse an" })}
        />
        {errors.address && (
          <span className="input-error-message">{errors.address.message}</span>
        )}
      </label>

      <label className="gym-form">
        Preis pro Stunde:
        <input
          type="number"
          min={1}
          max={999}
          className="gym-form max-w-[50%]"
          {...register("pricePerHour", {
            required: "Geben Sie dein Preis (Zahl) an",
          })}
        />
        {errors.pricePerHour && (
          <span className="input-error-message">
            {errors.pricePerHour.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
