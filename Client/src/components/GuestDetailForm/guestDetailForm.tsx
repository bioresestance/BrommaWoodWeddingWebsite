import { yupResolver } from "@hookform/resolvers/yup";
import { Diets } from "../../api/axios-client";
import { useForm } from "react-hook-form";
import DividerLine from "../dividerLine";
import useUpdateGuestDetails from "../../hooks/useUpdateGuestDetails";
import Modal from "../modal";
import { useState } from "react";
import {
  GuestDetailFormProps,
  GuestDetails,
  FormErrors,
} from "./guestDetailTypes";
import { GuestDetailSchema } from "./guestDetailValidationScheme";
import ContactInformation from "./ContactInformation";
import AddressInformation from "./AddressInformation";
import DietaryInformation from "./DietaryInformation";
import AdditionalNotes from "./AdditionalNotes";
import PlusOneInformation from "./PlusOneInformation";

const GuestDetailForm: React.FC<GuestDetailFormProps> = (props) => {
  const labelClass = "block mb-2 text-sm font-medium text-gray-900 text-black";
  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-blue-500 hover:border-blue-500 block w-full p-2.5";

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GuestDetails>({
    resolver: yupResolver(GuestDetailSchema),
    defaultValues: props.details
      ? {
          ...props.details,
          dietary_restrictions: props.details.dietary_restrictions?.map(
            (restriction) => ({ value: restriction })
          ),
        }
      : undefined, // Set initial values based on the incoming details
  });

  const { mutateAsync } = useUpdateGuestDetails();

  const [isModalOpen, setModalOpen] = useState(false);

  const submitFormData = async (data: GuestDetails) => {
    console.log(data);
    const transformedData = {
      ...data,
      dietary_restrictions: data.dietary_restrictions?.map(
        (restriction) => restriction.value
      ) as Diets[],
    };

    await mutateAsync(transformedData);
    setModalOpen(false);
  };

  const onSubmit = () => {
    setModalOpen(true);
  };

  const onErrors = (errors: FormErrors): void => {
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

      <div className={watch("attending") ? "" : "hidden"}>
        <DividerLine text="Contact Information" />
        <ContactInformation
          register={register}
          errors={errors}
          labelClass={labelClass}
          inputClass={inputClass}
        />

        <DividerLine text="Address" />
        <AddressInformation
          register={register}
          errors={errors}
          labelClass={labelClass}
          inputClass={inputClass}
        />

        <DividerLine text="Dietary Restrictions" />
        <DietaryInformation
          register={register}
          errors={errors}
          labelClass={labelClass}
          inputClass={inputClass}
          control={control}
        />

        <DividerLine text="Additional Notes" />
        <AdditionalNotes
          register={register}
          errors={errors}
          labelClass={labelClass}
          inputClass={inputClass}
        />

        <DividerLine text="Plus One Information" />

        {/* Plus One */}
        <PlusOneInformation
          register={register}
          errors={errors}
          labelClass={labelClass}
          inputClass={inputClass}
          plus_one_allowed={props.details?.plus_one_allowed}
        />
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Save
      </button>

      <Modal
        isOpen={isModalOpen}
        severity="info"
        title="Confirm"
        message="Are you sure you want to save these changes?"
        onConfirm={() => {
          submitFormData(watch());
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
      />
    </form>
  );
};

export default GuestDetailForm;
