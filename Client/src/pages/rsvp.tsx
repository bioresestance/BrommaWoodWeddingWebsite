import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from "../authContext";
import { useNavigate } from "react-router-dom";

const RSVP: React.FC = () => {
  const schema = yup.object().shape({
    rsvp_code: yup
      .string()
      .required("Please enter your RSVP code.")
      .min(6, "Please enter a valid RSVP code."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = async (data: { rsvp_code: string }) => {
    try {
      const response: boolean = await login(data.rsvp_code, "guest");

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

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-white pt-[40vh]">
      <p className="text-xl font-bold text-black rounded-full p-12 pr-16">
        RSVP
      </p>
      <br />
      <br />
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input
          className="w-96 h-12 rounded-full border border-black text-center text-black"
          type="text"
          placeholder="Enter your RSVP code"
          {...register("rsvp_code")}
        />
        <br />
        <p className="text-red-600">{errors.rsvp_code?.message}</p>
        <br />
        {isError && (
          <p className="text-red-600">
            That RSVP code was incorrect, please check and try again!
          </p>
        )}
        <br />
        <button
          className="bg-blue-600/75 hover:bg-blue-800 text-xl border-2 border rounded-full border-black text-white/90 hover:text-white font-bold py-4 px-8"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RSVP;
