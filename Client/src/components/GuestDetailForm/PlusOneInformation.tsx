// Client/src/components/ContactInformation.tsx
import React from "react";
import { Control, UseFormWatch } from "react-hook-form";
import { GuestContactProps, GuestDetails } from "./guestDetailTypes";
import PlusOneDietaryInformation from "./PlusOneDietaryInformation";

type PlusOneInformationProps = GuestContactProps & {
  plus_one_allowed: boolean;
  control: Control<GuestDetails>;
  watch: UseFormWatch<GuestDetails>;
};

const PlusOneInformation: React.FC<PlusOneInformationProps> = ({
  register,
  errors,
  labelClass,
  inputClass,
  plus_one_allowed,
  control,
  watch,
}) => {
  const plusOne = watch("has_plus_one");

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
    <div>
      <div className="flex items-center justify-center m-10">
        <p className="text-lg pr-10">
          Are you Planning on bringing a plus one?
        </p>
        <input
          type="checkbox"
          id="plus_one"
          className="w-6 h-6"
          {...register("has_plus_one")}
        />
      </div>
      <div className={plusOne ? "" : "hidden"}>
        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 ">
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
              {...register("plus_one.first_name")}
            />
            {errors?.first_name && (
              <p className="text-red-500 text-sm">
                {errors?.plus_one.first_name.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="plus_one_last_name" className={labelClass}>
              Last Name
            </label>
            <input
              type="text"
              id="plus_one_last_name"
              autoComplete="family-name"
              className={inputClass}
              {...register("plus_one.last_name")}
            />
            {errors?.last_name && (
              <p className="text-red-500 text-sm">
                {errors?.plus_one.last_name.message}
              </p>
            )}
          </div>
          {/* Email Address */}
          <div>
            <label htmlFor="plus_one_email" className={labelClass}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              autoComplete="plus_one_email"
              className={inputClass}
              {...register("plus_one.email")}
            />
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors?.plus_one.email.message}</p>
            )}
          </div>
        </div>
        <br />
        <br />
        <PlusOneDietaryInformation
          register={register}
          errors={errors}
          labelClass={labelClass}
          inputClass={inputClass}
          control={control}
        />
        <br />
        <br />
        <textarea
          id="notes"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5"
          placeholder="Please enter any additional notes here that we will need to know about your plus one!"
          {...register("plus_one.additional_notes")}
        />
      </div>
      <div className="col-span-3">
        <label htmlFor="plus_one_is_over_19" className="flex items-center">
          <input
            type="checkbox"
            id="plus_one_is_over_19"
            className="mr-2 w-6 h-6"
            {...register("plus_one.is_over_19")}
          />
          Will you be 19 or older by the wedding date on June 15, 2025?
        </label>
        {errors?.is_over_19 && (
          <p className="text-red-500 text-sm">{errors?.plus_one.is_over_19.message}</p>
        )}
      </div>
    </div>
  );
};

export default PlusOneInformation;
