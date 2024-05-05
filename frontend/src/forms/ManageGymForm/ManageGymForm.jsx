import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import EquipmentSection from "./EquipmentSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";
import SportsSection from "./SportsSection";

const ManageGymForm = ({ onSave, isLoading, gym }) => {
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
        <span className="flex flex-col gap-10">
          <DetailsSection />
          <SportsSection />
          <EquipmentSection />
          <ImagesSection />
        </span>
        <span className="flex justify-end">
          <button disabled={isLoading} type="submit" className="gym-form">
            {isLoading ? "Speichert..." : "Speichern"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageGymForm;
