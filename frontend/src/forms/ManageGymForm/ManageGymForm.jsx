import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FilterSection from "./FilterSection";
import ImagesSection from "./ImagesSection";

const ManageGymForms = ({ onSave, isLoading }) => {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("zipCode", formDataJson.zipCode);
    formData.append("city", formDataJson.city);
    formData.append("address", formDataJson.address);
    formData.append("pricePerHour", formDataJson.pricePerHour.toString());

    formDataJson.filters.forEach((filter, index) => {
      formData.append(`filters[${index}]`, filter);
    });

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-3 flex max-w-2xl grow flex-col gap-5 p-3"
      >
        <span className="flex flex-col gap-10">
          <DetailsSection />
          <FilterSection />
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

export default ManageGymForms;
