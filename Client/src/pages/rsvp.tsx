import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from "../authContext";
import { useNavigate } from "react-router-dom";

const RSVPPage: React.FC = () => {
  const schema = yup.object().shape({
    rsvp_code: yup
      .string()
      .required("Please enter your RSVP code.")
      .min(6, "Please enter a valid RSVP code."),
    agreeToPrivacyPolicy: yup
      .boolean()
      .oneOf([true], "You must agree to the privacy policy."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { login, user } = useContext(AuthContext);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/user");
    }
  }, [user, navigate]);

  const onSubmit = async (data: { rsvp_code: string; agreeToPrivacyPolicy: boolean }) => {
    try {
      const response: boolean = await login(data.rsvp_code);

      if (response) {
        setError(false);
        navigate("/user");
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const onError = (error: Record<string, unknown>) => {
    console.log(error);
  };
  const agreeToPrivacyPolicy = watch("agreeToPrivacyPolicy");

  return (
    <div className="flex flex-col items-center text-center w-full min-h-screen text-black pt-[20vh] px-4 md:px-0">
      <div className="w-full max-w-md mx-auto">
        <p className="text-2xl md:text-5xl font-bold text-black p-6 md:p-12 pr-8 md:pr-16">
          RSVP
        </p>
        <p className="mt-4 md:mt-8">
          This RSVP system will be open until <strong>April 30th, 2025</strong>. You are able to make changes to your RSVP until this date. If you have any questions or need to make changes after this date, please contact us!
        </p>
        <br />
        <p className="mt-4 md:mt-8">
          Please enter your RSVP code that was sent to you in the invite email in order to proceed. Please Note, the RSVP code is case-sensitive.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="mt-8 w-full"
        >
          <input
            className="w-full h-12 rounded-full border border-black text-center text-black mb-4 bg-white"
            type="text"
            placeholder="Enter your RSVP code"
            {...register("rsvp_code")}
          />
          <p className="text-red-600 text-center mb-4">
            {errors.rsvp_code?.message}
          </p>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              {...register("agreeToPrivacyPolicy")}
              className="mr-2"
            />
            <label className="text-black">
              I agree to the{" "}
              <a href="/privacy" className="text-blue-600 underline font-bold">
                privacy policy
              </a>
              .
            </label>
          </div>
          <p className="text-red-600 text-center mb-4">
            {errors.agreeToPrivacyPolicy?.message}
          </p>
          {isError && (
            <p className="text-red-600 text-center mb-4">
              That RSVP code was incorrect, please check and try again!
            </p>
          )}
          <button
            className={`w-full text-3xl border-2 rounded-full border-black font-bold py-4 px-8 mb-10 ${agreeToPrivacyPolicy
              ? "bg-blue-600/75 hover:bg-blue-800 text-white/90 hover:text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            type="submit"
            disabled={!agreeToPrivacyPolicy}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RSVPPage;
