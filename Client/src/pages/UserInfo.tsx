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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left w-full max-w-lg">
        <strong>Date:</strong> <span>15th of June 2025</span>
        <strong>Location:</strong> <span>Sea Cider Farm & Ciderhouse, Saanichton BC</span>
        <strong>Time:</strong> <span>Guests arrive at 3:30pm, ceremony starts at 4:00pm</span>
        <strong>Details:</strong> <span>The ceremony will be held outside, please dress accordingly.</span>
      </div>
      <br />
      <div className=" border-black border-4 mt-10 mx-2 md:mx-16 p-6">
        <GuestDetailForm />
      </div>
    </div>
  );
};

export default UserInfoPage;
