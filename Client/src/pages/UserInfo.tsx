import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const UserInfoPage: React.FC = () => {

  const schema = yup.object().shape({
    rsvp_code: yup.string().required("Please enter your RSVP code.").min(6, "Please enter a valid RSVP code."),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const onError = (error: any) => {
    console.log(error)
  }

  let firstName = "Aaron"
  return (
    <div className="flex flex-col items-center w-full min-h-screen text-black pt-[10vh]">
      <p className="text-5xl font-bold text-black rounded-full p-12 pr-16">
        Welcome {firstName}
      </p>
      <br />
      Below is your provided information. Please ensure it is correct and up to date!
      <br />
      <br />
      Please be aware that you will have until <span className="font-bold">April 30th, 2025</span> to make any changes, after that date we will lock this site.

      <form onSubmit={handleSubmit(onSubmit, onError)}>
      </form>
    </div>
  );
};

export default UserInfoPage;
