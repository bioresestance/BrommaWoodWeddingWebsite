import useGetGuestDetails from "../hooks/useGetGuestDetails";
import GuestDetailForm from "../components/guestDetailForm";

const UserInfoPage: React.FC = () => {
  const { data, isLoading } = useGetGuestDetails();

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-black pt-[5vh]">
      <p className="text-5xl font-bold text-black rounded-full p-12 pr-16">
        Welcome {data?.data.first_name}
      </p>
      {isLoading ? <p>Loading...</p> : <GuestDetailForm details={data?.data} />}
    </div>
  );
};

export default UserInfoPage;
