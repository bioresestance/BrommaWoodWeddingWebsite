import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Diets } from "../../api/axios-client";
import useUpdateGuestDetails from "../../hooks/useUpdateGuestDetails";
import useGetGuestDetails from "../../hooks/useGetGuestDetails";

import DividerLine from "../dividerLine";
import Modal from "../modal";

import { GuestDetails, FormErrors } from "./guestDetailTypes";
import { GuestDetailSchema } from "./guestDetailValidationScheme";
import ContactInformation from "./ContactInformation";
import AddressInformation from "./AddressInformation";
import DietaryInformation from "./DietaryInformation";
import AdditionalNotes from "./AdditionalNotes";
import PlusOneInformation from "./PlusOneInformation";

const GuestDetailForm = () => {
  const labelClass = "block mb-2 text-sm font-medium text-gray-900 text-black";
  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-blue-500 hover:border-blue-500 block w-full p-2.5";
  const { mutate } = useUpdateGuestDetails((error) => {
    setNotification({ message: `Error: ${error.message}`, type: "error" });
  });
  const { data } = useGetGuestDetails();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GuestDetails>({
    resolver: yupResolver(GuestDetailSchema),
    defaultValues: data.data
      ? {
          ...data.data,
          dietary_restrictions: data.data.dietary_restrictions?.map(
            (restriction) => ({ value: restriction })
          ),
          plus_one: data.data.plus_one
            ? {
                ...data.data.plus_one,
                dietary_restrictions:
                  data.data.plus_one.dietary_restrictions?.map(
                    (restriction) => ({ value: restriction })
                  ),
              }
            : undefined,
        }
      : undefined, // Set initial values based on the incoming details
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const submitFormData = async (formData: GuestDetails) => {
    const transformedData = {
      ...formData,
      dietary_restrictions: formData.dietary_restrictions?.map(
        (restriction) => restriction.value
      ) as Diets[],
      plus_one: formData.plus_one
        ? {
            first_name: formData.plus_one.first_name || "",
            last_name: formData.plus_one.last_name || "",
            email: formData.plus_one.email || "",
            additional_notes: formData.plus_one.additional_notes || "",
            dietary_restrictions: formData.plus_one.dietary_restrictions?.map(
              (restriction) => restriction.value
            ) as Diets[],
          }
        : undefined,
    };

    try {
      mutate(transformedData);
      setNotification({
        message: "Details saved successfully!",
        type: "success",
      });
    } catch (error) {
      setNotification({ message: `Error: ${error.message}`, type: "error" });
    }
    setModalOpen(false);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const onSubmit = () => {
    setModalOpen(true);
  };

  const onErrors = (errors: FormErrors): void => {
    console.log(errors);
  };

  return (
    <div>
      {notification && (
        <div
          className={
            "fixed top-0 left-0 right-0 border px-4 py-3 rounded z-10 text-center " +
            (notification.type === "success"
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100  border-red-400 text-red-700")
          }
          role="alert"
        >
          <strong className="font-bold">
            {notification.type === "success" ? "Success!" : "Error!"}
          </strong>
          <br />
          <span className="block sm:inline">{notification.message}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setNotification(null)}
          >
            <svg
              className={"fill-current h-6 w-6 "}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
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

          <br />
          <br />
          <DividerLine text="Plus One Information" />

          {/* Plus One */}
          <PlusOneInformation
            register={register}
            errors={errors}
            labelClass={labelClass}
            inputClass={inputClass}
            plus_one_allowed={data.data?.plus_one_allowed}
            watch={watch}
            control={control}
          />
        </div>

        <br />
        <br />
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white text-2xl font-extrabold p-3 rounded-xl"
          >
            Save
          </button>
        </div>

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
    </div>
  );
};

export default GuestDetailForm;
