import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UserInfoPage: React.FC = () => {
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

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const firstName = "Aaron";
  const dummyUser = { id: 1, name: "John Doe", email: "john@example.com" };

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-black pt-[5vh]">
      <p className="text-5xl font-bold text-black rounded-full p-12 pr-16">
        Welcome {firstName}
      </p>
      <table className="table-fixed w-[50%] border m-12">
        <tbody>
          {Object.entries(dummyUser).map(([key, value]) => (
            <tr key={key}>
              <td className="pl-10">{key}</td>
              <td className=" text-center">{value}</td>
              <td className=" text-center">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
        Submit Changes
      </button>
    </div>
  );
};

export default UserInfoPage;
