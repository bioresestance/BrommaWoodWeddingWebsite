import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Diets } from "../../api/axios-client";
import useUpdateGuestDetails from "../../hooks/useUpdateGuestDetails";
import useGetGuestDetails from "../../hooks/useGetGuestDetails";
import { useNavigate } from "react-router-dom";

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
  const labelClass = "block mb-2 text-xl font-medium text-gray-900 text-black";
  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg hover:ring-blue-500 hover:border-blue-500 block w-full p-2.5";
  const { mutate } = useUpdateGuestDetails((error) => {
    setNotification({ message: `Error: ${error.message}`, type: "error" });
  });
  const { data } = useGetGuestDetails();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
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

  const navigate = useNavigate();

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
          is_over_19: formData.plus_one.is_over_19,
        }
        : undefined,
    };

    try {
      mutate(transformedData);
      const isGoing = formData.attending ? "yes" : "no";
      navigate(`/confirmation?isGoing=${isGoing}`);
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

  const handleYesClick = () => {
    setValue("attending", true, { shouldDirty: true });
  };

  const handleNoClick = () => {
    setValue("attending", false, { shouldDirty: true });
    handleSubmit(onSubmit, onErrors)();
  };

  const attending = watch("attending");

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
          <p className="md:w-[70%] font-bold text-center">
            If you plan on attending the event on{" "}
            <span className="underline font-bold">June 15th, 2025</span>, please indicate
            using the following buttons. If you are attending, please fill out the form that appears below and hit save.
          </p>
          <br />
          <br />
          <div className="flex space-x-4 mt-10">
            <button
              type="button"
              onClick={handleYesClick}
              className="bg-green-500 text-white text-2xl font-extrabold p-3 rounded-xl"
            >
              Yes, I plan on attending
            </button>
            <button
              type="button"
              onClick={handleNoClick}
              className="bg-red-500 text-white text-2xl font-extrabold p-3 rounded-xl"
            >
              No, I won't be able to make it
            </button>
          </div>
          <p>(You may change this selection anytime)</p>
        </div>

        <div className={attending ? "" : "hidden"}>
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

        {attending && (
          <>
            <br />
            <br />
            <DividerLine text="Wedding Expectations" />
            <div className="bg-gray-100 p-4 rounded-lg">
              <ul className="list-disc pl-5 space-y-2">
                <li>The wedding will be modern, nontraditional, and non-religious; guests must respect our choices regarding included customs.</li>
                <li>Please, no gifts; instead, a wishing well will be available for contributions to our honeymoon.</li>
                <li>Only the Bride can wear white or related shades (the only exceptions are men's dress shirts).</li>
                <li>Only wedding party members may wear any amount of purple or blue.</li>
                <li>Phones and personal devices must be silent and put away during the ceremony and pre-dinner speeches.</li>
                <li>All guests are expected to set aside personal dynamics and focus on celebrating the wedding with us.</li>
                <li>Underage drinking is strictly prohibited, and any violators will be asked to leave with no warnings.</li>
              </ul>
              <br />
              <p className="mt-4 font-bold text-center">By submitting, you agree to follow these rules. <a href="/full-rules" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Read the full rules here</a>.</p>
            </div>
          </>
        )}

        <br />
        <br />
        {attending && (
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className={`mt-4 text-white text-2xl font-extrabold p-3 rounded-xl ${isDirty ? "bg-blue-500" : "bg-gray-500 cursor-not-allowed"
                }`}
              disabled={!isDirty}
            >
              Submit
            </button>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          severity="info"
          title="Confirm"
          message="Are you sure you want to submit?"
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
