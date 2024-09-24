import { yupResolver } from "@hookform/resolvers/yup";
import { GuestDetail } from "../api/axios-client";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";

type GuestDetailFormProps = {
  details: GuestDetail | undefined;
};

const GuestDetailForm: React.FC<GuestDetailFormProps> = (props) => {
  const labelClass =
    "block mb-2 text-sm font-medium text-gray-900 dark:text-black";
  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  const schema = yup.object().shape({
    attending: yup.boolean(),
    first_name: yup.string().when("attending", {
      is: true,
      then: (schema) => schema.required("Please enter your first name."),
    }),
    last_name: yup.string().when("attending", {
      is: true,
      then: (schema) => schema.required("Please enter your last name."),
    }),
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .when("attending", {
        is: true,
        then: (schema) => schema.required("Please enter your email."),
      }),
    phone: yup.string().when("attending", {
      is: true,
      then: (schema) =>
        schema
          .required("Please enter your phone number.")
          .matches(
            /^(\+\d{1,3}[- ]?)?(\d{3}[- ]?\d{3}[- ]?\d{4})$/,
            "Please enter a valid phone number."
          ),
    }),
    address: yup.string().when("attending", {
      is: true,
      then: (schema) => schema.required("Please enter your address."),
    }),
    city: yup.string().when("attending", {
      is: true,
      then: (schema) => schema.required("Please enter your city."),
    }),
    province: yup.string().when("attending", {
      is: true,
      then: (schema) => schema.required("Please enter your province."),
    }),
    area_code: yup.string().when("attending", {
      is: true,
      then: (schema) => schema.required("Please enter your area code."),
    }),
    country: yup.string().when("attending", {
      is: true,
      then: (schema) => schema.required("Please enter your country."),
    }),
    notes: yup.string(),
    dietary_restrictions: yup.array().of(
      yup.object().shape({
        value: yup.string(),
      })
    ),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.details, // Set initial values based on the incoming details
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dietary_restrictions",
  });

  const addDietaryRestriction = () => {
    append({ value: "" });
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const onErrors = (data) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
        {/* First Name */}
        <div>
          <label htmlFor="first_name" className={labelClass}>
            First Name
          </label>
          <input
            type="text"
            id="first_name"
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
            className={inputClass}
            {...register("last_name")}
          />
          {errors?.last_name && (
            <p className="text-red-500 text-sm">{errors?.last_name.message}</p>
          )}
        </div>
        {/* Email Address */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
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
            className={inputClass}
            {...register("phone")}
          />
          {errors?.phone && (
            <p className="text-red-500 text-sm">{errors?.phone.message}</p>
          )}
        </div>
        {/* Home Address */}
        <div>
          <label htmlFor="address" className={labelClass}>
            Home Address
          </label>
          <input
            type="text"
            id="address"
            className={inputClass}
            {...register("address")}
          />
          {errors?.address && (
            <p className="text-red-500 text-sm">{errors?.address.message}</p>
          )}
        </div>
        {/* Dietary Restrictions */}
        <div>
          <label htmlFor="dietary_restrictions" className={labelClass}>
            Dietary Restrictions
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center">
              <input
                type="text"
                id={`dietary_restrictions_${index}`}
                className={inputClass}
                {...register(`dietary_restrictions.${index}.value`)}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="ml-2 text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          {errors?.dietary_restrictions && (
            <p className="text-red-500 text-sm">
              {errors?.dietary_restrictions.message}
            </p>
          )}
          <button
            type="button"
            onClick={addDietaryRestriction}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Add Dietary Restriction
          </button>
        </div>
      </div>
      <div className="flex w-full items-center rounded-full">
        <div className="flex-1 border-b border-gray-300"></div>
        <span className="text-black text-lg font-semibold leading-8 px-8 py-3">
          Hi Gina!
        </span>
        <div className="flex-1 border-b border-gray-300"></div>
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default GuestDetailForm;
