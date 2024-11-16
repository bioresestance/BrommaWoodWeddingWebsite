import React from "react";
import { GuestContactProps, GuestDetails } from "./guestDetailTypes";
import { Control, useFieldArray } from "react-hook-form";

type DietaryInformationProps = GuestContactProps & {
  control: Control<GuestDetails>;
};

const DietaryInformation: React.FC<DietaryInformationProps> = ({
  register,
  errors,
  labelClass,
  inputClass,
  control,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dietary_restrictions",
  });
  const addDietaryRestriction = () => {
    append({ value: "none" });
  };

  return (
    <div>
      <label className={labelClass}>
        Dietary Restrictions
        <button
          type="button"
          onClick={addDietaryRestriction}
          className="mt-2 bg-blue-500 text-white p-2 m-3 rounded"
        >
          +
        </button>
      </label>
      <div className="grid grid-cols-2 gap-5">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center">
            <input
              type="text"
              id={`dietary_restrictions_${index}`}
              className={inputClass}
              autoComplete="off"
              {...register(`dietary_restrictions.${index}`)}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-2 text-red-700 bg-red-200 p-2 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>
      {errors?.dietary_restrictions && (
        <p className="text-red-500 text-sm">
          {errors?.dietary_restrictions.message}
        </p>
      )}
    </div>
  );
};

export default DietaryInformation;
