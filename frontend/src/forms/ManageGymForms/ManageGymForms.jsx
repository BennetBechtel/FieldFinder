import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";

const ManageGymForms = () => {
  const formMethods = useForm();

  return (
    <FormProvider {...formMethods}>
      <form>
        <DetailsSection />
      </form>
    </FormProvider>
  );
};

export default ManageGymForms;
