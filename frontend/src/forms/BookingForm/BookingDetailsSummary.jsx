import React from "react";
import { parseDate, germanDateFormat } from "../GuestInfoForm/formatDate";

const BookingDetailsSummary = ({
  bookingDate,
  startTime,
  endTime,
  numberOfHours,
  gym,
}) => {
  if (!gym) {
    return <></>;
  }

  return (
    <div className="grid h-fit gap-4 divide-y-[1px] rounded-lg border border-slate-300 p-5">
      <h2 className="text-xl font-bold">Details zu Ihrer Buchung</h2>
      <div className="pt-3">
        Sporthalle:
        <div className="font-bold">{gym.name}</div>
      </div>

      <div className="pt-3">
        Adresse:
        <div className="font-bold">{`${gym.address}, ${gym.zipCode} ${gym.city}`}</div>
      </div>

      <div className="pt-3">
        Datum:
        <div className="font-bold">{germanDateFormat(bookingDate)}</div>
      </div>

      <div className="flex justify-between pt-3">
        <div>
          Start Uhrzeit
          <div className="font-bold">{parseDate(startTime)}</div>
        </div>
        <div>
          End Uhrzeit
          <div className="font-bold">{parseDate(endTime)}</div>
        </div>
      </div>
      <div className="pt-3">
        Gesamtlänge der Buchung;
        <div className="font-bold">{numberOfHours} Stunden</div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
