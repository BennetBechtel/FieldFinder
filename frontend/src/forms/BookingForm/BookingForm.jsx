import { useForm } from "react-hook-form";
import { PayPalButtons } from "@paypal/react-paypal-js";

const BookingForm = ({ currentUser, paymentIntent }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

  return (
    <form className="grid h-fit grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
      <span className="text-3xl font-bold">Bestätigen Sie Ihre Angaben</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="flex-1 text-sm font-bold text-gray-700">
          Vorname
          <input
            type="text"
            readOnly
            disabled
            className="mt-1 w-full rounded border bg-gray-200 px-3 py-2 font-normal text-gray-700"
            {...register("firstName")}
          />
        </label>

        <label className="flex-1 text-sm font-bold text-gray-700">
          Nachname
          <input
            type="text"
            readOnly
            disabled
            className="mt-1 w-full rounded border bg-gray-200 px-3 py-2 font-normal text-gray-700"
            {...register("lastName")}
          />
        </label>

        <label className="flex-1 text-sm font-bold text-gray-700">
          Email
          <input
            type="text"
            readOnly
            disabled
            className="mt-1 w-full rounded border bg-gray-200 px-3 py-2 font-normal text-gray-700"
            {...register("email")}
          />
        </label>
      </div>
      <PayPalButtons />
    </form>
  );
};

export default BookingForm;
