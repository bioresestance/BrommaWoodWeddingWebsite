import { useCountdown } from "../hooks/useCountdown";

interface DateTimeDisplayProps {
  value: number;
  type: string;
}

interface ShowCounterProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: number;
}

const DateTimeDisplay = ({ value, type }: DateTimeDisplayProps) => {
  return (
    <div className="flex flex-col justify-center align-middle text-center">
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }: ShowCounterProps) => {
  return (
    <div className="flex flex-row bg-purple-400/65 text-lg justify-center align-middle text-black font-bold rounded-full px-7 py-1 space-x-2">
      <DateTimeDisplay value={days} type={"Days"} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={"Hours"} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={"Mins"} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={"Seconds"} />
    </div>
  );
};

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ShowCounter days={0} hours={0} minutes={0} seconds={0} />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
