import {useState, useEffect} from 'react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({hours: 0, minutes: 0, seconds: 0});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({hours, minutes, seconds});
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#FFF5F9] rounded-lg px-4 py-3 flex items-center justify-center gap-2">
      <span className="text-[#D61C8C] font-semibold text-sm">
        Fin dans :
      </span>
      <div className="flex items-center gap-1.5">
        {/* Hours */}
        <div className="bg-[#D61C8C] text-white font-bold text-lg rounded-lg px-3 py-1.5 min-w-[45px] text-center">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className="text-[#D61C8C] font-bold text-lg">:</span>

        {/* Minutes */}
        <div className="bg-[#D61C8C] text-white font-bold text-lg rounded-lg px-3 py-1.5 min-w-[45px] text-center">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className="text-[#D61C8C] font-bold text-lg">:</span>

        {/* Seconds */}
        <div className="bg-[#D61C8C] text-white font-bold text-lg rounded-lg px-3 py-1.5 min-w-[45px] text-center">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
