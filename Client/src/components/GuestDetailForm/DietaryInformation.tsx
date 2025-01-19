import React from "react";
import { GuestContactProps, GuestDetails } from "./guestDetailTypes";
import { Control, useFieldArray } from "react-hook-form";

type DietaryInformationProps = GuestContactProps & {
  control: Control<GuestDetails>;
};

const dietaryOptions = [
  { label: "None", value: "none" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Gluten-Free", value: "gluten_free" },
  { label: "Dairy-Free", value: "dairy_free" },
  { label: "Nut-Free", value: "nut_free" },
  { label: "Shellfish Allergy", value: "shellfish_free" },
  { label: "Other (Please add note below)", value: "other" },
];

const DietaryInformation: React.FC<DietaryInformationProps> = ({
  register,
  errors,
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
      <div className="flex items-center gap-2">
        <label className="block mb-2 text-lg font-medium text-black">
          Add Dietary Restrictions (Optional)
        </label>
        <button
          type="button"
          onClick={addDietaryRestriction}
          className="mt-2 bg-blue-500 text-white p-2 m-3 rounded px-4 text-2xl font-extrabold"
        >
          +
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center">
            <select
              id={`dietary_restrictions_${index}`}
              className={inputClass}
              {...register(`dietary_restrictions.${index}.value`)}
            >
              {dietaryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
