import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import EquipmentSection from "./EquipmentSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";
import SportsSection from "./SportsSection";

const ManageGymForm = ({ onSave, isLoading, gym, formType, onDelete }) => {
  const formMethods = useForm();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(gym);
  }, [gym, reset]);

  const onSubmit = handleSubmit((formDataJson) => {
    const formData = new FormData();
    if (gym) {
      formData.append("gymId", gym._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("zipCode", formDataJson.zipCode);
    formData.append("city", formDataJson.city);
    formData.append("address", formDataJson.address);
    formData.append("pricePerHour", formDataJson.pricePerHour.toString());

    formDataJson.sports.forEach((sport, index) => {
      formData.append(`sports[${index}]`, sport);
    });

    formDataJson.equipment.forEach((equip, index) => {
      formData.append(`equipment[${index}]`, equip);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-3 flex w-full max-w-3xl grow flex-col gap-5 p-3"
      >
        <span className="text-center sm:text-start">
          <h1 className="text-3xl font-bold">
            {formType === "AddGym" && "Sporthalle Hinzufügen"}
            {formType === "EditGym" && "Sporthalle Bearbeiten"}
          </h1>
        </span>

        <span className="flex flex-col gap-10">
          <DetailsSection />
          <SportsSection />
          <EquipmentSection />
          <ImagesSection />
        </span>
        <span
          className={
            formType === "EditGym" ? "flex justify-between" : "flex justify-end"
          }
        >
          {formType === "EditGym" && (
            <button
              disabled={isLoading}
              type="button"
              onClick={() => onDelete(gym._id)}
              className="rounded-2xl bg-red-600 px-4 py-3 text-xl font-bold transition duration-75 hover:opacity-85 active:opacity-75 disabled:bg-gray-400"
            >
              {isLoading ? "Löscht..." : "Löschen"}
            </button>
          )}

          <button disabled={isLoading} type="submit" className="gym-form">
            {isLoading ? "Speichert..." : "Speichern"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageGymForm;
