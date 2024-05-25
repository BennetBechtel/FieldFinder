import { useForm } from "react-hook-form";
import PayPalPayment from "./PayPalPayment.jsx";
import { useState } from "react";
import { useSearchContext } from "../../contexts/SearchContext.jsx";
import * as apiClient from "../../api-client.js";
import { useAppContext } from "../../contexts/AppContext.jsx";

const BookingForm = ({ currentUser, gymId, numberOfHours, pricePerHour }) => {
  const search = useSearchContext();
  const { showToast } = useAppContext();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      bookingDate: search.bookingDate,
      startTime: search.startTime,
      endTime: search.endTime,
      gymId: gymId,
      totalCost: numberOfHours * pricePerHour,
    },
  });

  const bookGym = () => {
    const formData = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      bookingDate: search.bookingDate,
      startTime: search.startTime,
      endTime: search.endTime,
      gymId: gymId,
      transaction: {},
    };
    apiClient.createGymBooking(formData);
    showToast({ message: "Buchung gespeichert!", type: "SUCCESS" });
  };

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

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Preisübersicht</h2>
        <div className="rounded-md bg-checkout p-4">
          <div className="text-lg font-semibold">
            Gesamtkosten: {numberOfHours * pricePerHour}€
          </div>
          <div className="text-xs">Einschließlich Steuern und Gebühren</div>
        </div>
      </div>

      <div className="mt-2">
        <PayPalPayment
          gymId={gymId}
          numberOfHours={numberOfHours}
          bookGym={bookGym}
        />
      </div>
    </form>
  );
};

export default BookingForm;
