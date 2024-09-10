import CountdownTimer from "../components/countdownTimer";
import { Link } from "react-router-dom";
import useCheckApiConnection from "../hooks/useCheckApiConnection";

const Home: React.FC = () => {
  const wedding_time = new Date("2025-06-15T16:00:00Z").getTime();
  const { data, error, isLoading } = useCheckApiConnection();

  console.log(data?.data.msg);

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-fixed background">
      <div className="flex flex-col items-center w-full min-h-screen text-white pt-[30vh]">
        <p className="text-9xl font-bold text-white title rounded-full p-12 pr-16">
          Aaron + Gina
        </p>
        <br />
        <CountdownTimer targetDate={wedding_time} />
        <br />
        <div className="z-10 px-5 py-2 pb-20">
          <Link to="/rsvp">
            <button className="bg-blue-600/75 hover:bg-blue-800 text-xl border-2 border rounded-full border-black text-white/90 hover:text-white font-bold py-4 px-8">
              RSVP?
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
