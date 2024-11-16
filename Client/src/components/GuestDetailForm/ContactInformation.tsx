import React from "react";
import { GuestContactProps } from "./guestDetailTypes";

const ContactInformation: React.FC<GuestContactProps> = ({
  register,
  errors,
  labelClass,
  inputClass,
}) => (
  <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
    {/* First Name */}
    <div>
      <label htmlFor="first_name" className={labelClass}>
        First Name
      </label>
      <input
        type="text"
        id="first_name"
        disabled={true}
        autoComplete="given-name"
        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        {...register("first_name")}
      />
      {errors?.first_name && (
        <p className="text-red-500 text-sm">{errors?.first_name.message}</p>
      )}
    </div>

    {/* Last Name */}
    <div>
      <label htmlFor="last_name" className={labelClass}>
        Last Name
      </label>
      <input
        type="text"
        id="last_name"
        disabled={true}
        autoComplete="family-name"
        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        {...register("last_name")}
      />
      {errors?.last_name && (
        <p className="text-red-500 text-sm">{errors?.last_name.message}</p>
      )}
    </div>
    {/* Preferred Name */}
    <div>
      <label htmlFor="preferred_name" className={labelClass}>
        Preferred Name (if different)
      </label>
      <input
        type="text"
        id="preferred_name"
        autoComplete="off"
        className={inputClass}
        {...register("preferred_name")}
      />
    </div>

    {/* Email Address */}
    <div>
      <label htmlFor="email" className={labelClass}>
        Email Address
      </label>
      <input
        type="email"
        id="email"
        autoComplete="email"
        className={inputClass}
        {...register("email")}
      />
      {errors?.email && (
        <p className="text-red-500 text-sm">{errors?.email.message}</p>
      )}
    </div>

    {/* Phone */}
    <div>
      <label htmlFor="phone" className={labelClass}>
        Phone Number
      </label>
      <input
        type="phone"
        id="phone"
        autoComplete="tel"
        className={inputClass}
        {...register("phone")}
      />
      {errors?.phone && (
        <p className="text-red-500 text-sm">{errors?.phone.message}</p>
      )}
    </div>
  </div>
);

export default ContactInformation;
