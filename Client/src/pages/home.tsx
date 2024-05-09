import React from "react";
import CountdownTimer from "../components/countdownTimer";

const Home: React.FC = () => {
  const wedding_time = new Date("2025-06-15T16:00:00Z").getTime();

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-fixed background">
      <div className="flex flex-col items-center w-full min-h-screen text-white pt-[40vh]">
        <p className="text-9xl font-bold text-white title bg-blue-500/30 rounded-full p-12 pr-16">
          Aaron + Gina
        </p>
        <br />
        <CountdownTimer targetDate={wedding_time} />
      </div>
    </div>
  );
};

export default Home;
