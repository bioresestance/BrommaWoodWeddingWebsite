import React from "react";
import { GuestContactProps } from "./guestDetailTypes";

const AdditionalNotes: React.FC<GuestContactProps> = ({ register }) => (
  <div className="pb-5">
    <textarea
      id="notes"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg block w-full  p-2.5"
      placeholder="Please enter any additional notes here that we will need to know!"
      {...register("additional_notes")}
    />
  </div>
);

export default AdditionalNotes;
