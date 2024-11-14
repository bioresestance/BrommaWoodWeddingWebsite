import { yupResolver } from "@hookform/resolvers/yup";
import { Diets, GuestDetail } from "../api/axios-client";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import DividerLine from "./dividerLine";

type GuestDetailFormProps = {
  details: GuestDetail | undefined;
};

type GuestDetailForm = {
  attending?: boolean;
  first_name?: string;
  last_name?: string;
  preferred_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  area_code?: string;
  country?: string;
  additional_notes?: string;
  dietary_restrictions?: { value?: Diets }[];
};

const GuestDetailForm: React.FC<GuestDetailFormProps> = (props) => {
  const labelClass = "block mb-2 text-sm font-medium text-gray-900 text-black";
  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-blue-500 hover:border-blue-500 block w-full p-2.5";

  const schema = yup.object().shape({
    attending: yup.boolean(),
    first_name: yup.string(),
    last_name: yup.string(),
    preferred_name: yup.string(),
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
            /^(\+?1[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{4}$/,
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
      then: (schema) => schema.required("Please Select a province."),
    }),
    area_code: yup.string().when("attending", {
      is: true,
      then: (schema) => schema.required("Please enter your Postal code."),
    }),
    country: yup.string().when("attending", {
      is: true,
      then: (schema) => schema.required("Please enter your country."),
    }),
    additional_notes: yup.string(),
    dietary_restrictions: yup.array().of(
      yup.object().shape({
        value: yup
          .string()
          .oneOf(
            Object.values(Diets),
            "Please enter a valid dietary restriction."
          )
          .required("Please enter a dietary restriction."),
      })
    ),
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GuestDetailForm>({
    resolver: yupResolver(schema),
    defaultValues: props.details, // Set initial values based on the incoming details
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dietary_restrictions",
  });

  const watchAttending = watch("attending");
  const plusOneAllowed = props.details?.plus_one_allowed;

  const addDietaryRestriction = () => {
    append({ value: "none" });
  };

  const onSubmit = (data: GuestDetailForm) => {
    console.log(data);
  };

  const onErrors = (data) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div className="w-full flex flex-col items-center my-5 pb-6 md:mb-16">
        <p className=" md:w-[70%] lg:text-xl md:text-lg text-sm font-bold">
          If you plan on attending the event on{" "}
          <span className="underline">June 15th, 2025</span>, please indicate
          using the following button, and fill out the form below. After any
          changes, please make sure to hit save.
        </p>
        <br />
        <br />
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            {...register("attending")}
          />
          <div className="relative w-14 h-7 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className=" md:ms-5 ms-10  md:text-3xl text-lg font-bold text-gray-900">
            I Plan On Attending
          </span>
        </label>
      </div>

      <div className={watchAttending ? "" : "hidden"}>
        <DividerLine text="Contact Information" />

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
              <p className="text-red-500 text-sm">
                {errors?.first_name.message}
              </p>
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
              <p className="text-red-500 text-sm">
                {errors?.last_name.message}
              </p>
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
        <br />
        <DividerLine text="Address" />

        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
          {/* Home Address */}
          <div className="col-span-2">
            <label htmlFor="address" className={labelClass}>
              Home Address
            </label>
            <input
              type="text"
              id="address"
              className={inputClass}
              autoComplete="street-address"
              {...register("address")}
            />
            {errors?.address && (
              <p className="text-red-500 text-sm">{errors?.address.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input
              type="text"
              id="city"
              className={inputClass}
              autoComplete="address-level2"
              {...register("city")}
            />
            {errors?.city && (
              <p className="text-red-500 text-sm">{errors?.city.message}</p>
            )}
          </div>

          {/* Province */}
          <div>
            <label htmlFor="province" className={labelClass}>
              Province
            </label>
            <select
              id="province"
              className={inputClass}
              autoComplete="address-level1"
              defaultValue=""
              {...register("province")}
            >
              <option value="">Choose a province</option>
              <option value="BC">British Columbia</option>
              <option value="QC">Quebec</option>
              <option value="NB">New Brunswick</option>
              <option value="MB">Manitoba</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="SK">Saskatchewan</option>
              <option value="AB">Alberta</option>
              <option value="NL">Newfoundland & Labrador</option>
            </select>
            {errors?.address && (
              <p className="text-red-500 text-sm">
                {errors?.province?.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className={labelClass}>
              Postal Code
            </label>
            <input
              type="text"
              id="country"
              className={inputClass}
              autoComplete="postal-code"
              {...register("country")}
            />
            {errors?.country && (
              <p className="text-red-500 text-sm">{errors?.country.message}</p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label htmlFor="area_code" className={labelClass}>
              Postal Code
            </label>
            <input
              type="text"
              id="area_code"
              className={inputClass}
              autoComplete="postal-code"
              {...register("area_code")}
            />
            {errors?.area_code && (
              <p className="text-red-500 text-sm">
                {errors?.area_code.message}
              </p>
            )}
          </div>
        </div>

        <br />

        {/* Dietary Restrictions */}
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
        <br />
        <DividerLine text="Additional Notes" />
        {/* Notes */}
        <div className="pb-5">
          <textarea
            id="notes"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full  p-2.5"
            placeholder="Please enter any additional notes here that we will need to know!"
            {...register("additional_notes")}
          />
        </div>

        <DividerLine text="Plus One Information" />

        {/* Plus One */}
        {!plusOneAllowed && (
          <div className="flex items-center justify-center text-center w-full py-5">
            <p className="md:w-[50%]">
              We are very sorry,we have to limit the number of guests at our
              wedding due to budget and space. As such, you are not eligible to
              bring a plus one. Please read the{" "}
              <a href="/faq" className="text-blue-500 underline">
                FAQ
              </a>{" "}
              for more information.
            </p>
          </div>
        )}
        {plusOneAllowed && <div>Good Job, you are allowed a guest! Yay!</div>}
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Save
      </button>
    </form>
  );
};

export default GuestDetailForm;
