// Client/src/components/ContactInformation.tsx
import React from "react";
import { GuestContactProps } from "./guestDetailTypes";

type PlusOneInformationProps = GuestContactProps & {
  plus_one_allowed: boolean;
};

const PlusOneInformation: React.FC<PlusOneInformationProps> = ({
  register,
  errors,
  labelClass,
  inputClass,
  plus_one_allowed,
}) => {
  if (!plus_one_allowed) {
    return (
      <div className="flex items-center justify-center text-center w-full py-5">
        <p className="md:w-[50%]">
          We are very sorry, we have to limit the number of guests at our
          wedding due to budget and space. As such, you are not eligible to
          bring a plus one. Please read the{" "}
          <a href="/faq" className="text-blue-500 underline">
            FAQ
          </a>{" "}
          for more information.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
      {/* First Name */}
      <div>
        <label htmlFor="plus_one_first_name" className={labelClass}>
          First Name
        </label>
        <input
          type="text"
          id="plus_one_first_name"
          autoComplete="given-name"
          className={inputClass}
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
          autoComplete="family-name"
          className={inputClass}
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
    </div>
  );
};

export default PlusOneInformation;
