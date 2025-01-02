import useGetGuestDetails from "../hooks/useGetGuestDetails";
import GuestDetailForm from "../components/GuestDetailForm/guestDetailForm";

const UserInfoPage: React.FC = () => {
  const { data, isLoading } = useGetGuestDetails();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen mb-[10vh] text-black pt-[5vh]">
      <p className="text-5xl font-bold text-black rounded-full p-12 pr-16">
        Welcome {data?.data.first_name}
      </p>
      <br />
      <p className="text-5xl font-bold text-black rounded-full p-12 pr-16">
        Wedding Details:
      </p>
      <br />
      <p className="md:w-[50%] w-[90%]">
        Below are your current details, please make sure they are correct. If
        not, please update them and make sure to hit save. If you do not wish to
        to join us, make sure the "Join us" checkbox is unchecked.
      </p>
      <div className=" border-black border-4 mt-10 mx-2 md:mx-16 p-6">
        <GuestDetailForm />
      </div>
    </div>
  );
};

export default UserInfoPage;
