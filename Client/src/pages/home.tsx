import React, { useState } from "react";
import CountdownTimer from "../components/countdownTimer";

const Home: React.FC = () => {
  const wedding_time = new Date("2025-06-15T16:00:00Z").getTime();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Invite code submitted: " + inviteCode);
  };

  const [inviteCode, setInviteCode] = useState<string>("");

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-fixed background">
      <div className="flex flex-col items-center w-full min-h-screen text-white pt-[40vh]">
        <p className="text-9xl font-bold text-white title rounded-full p-12 pr-16">
          Aaron + Gina
        </p>
        <br />
        <CountdownTimer targetDate={wedding_time} />
        <br />
        <div className="  z-10 bg-blue-400/75 rounded-full px-5 py-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row items-center space-x-10"
          >
            <label
              htmlFor="inviteCode"
              className="text-lg text-black font-bold"
            >
              Invite Code?
            </label>
            <input
              id="inviteCode"
              type="text"
              className="rounded-md px-2 py-1 border-2 border-black"
              onChange={(e) => setInviteCode(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 border-1 border-black text-white font-bold py-2 px-4 rounded hover:bg-blue-100"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
