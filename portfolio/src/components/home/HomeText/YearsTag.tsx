"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// This is a component that displays my age in very detailed way
// It displays the years, days not fitting in a year, hours not fitting in a day, minutes not fitting in an hour, seconds not fitting in a minute

const BIRTHDAY = new Date("2003-02-03T15:00:00-06:00");

export default function YearsTag() {
  const [age, setAge] = useState({
    years: 22,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    function getAge() {
      const now = new Date();
      // Mon Feb 03 2025 18:02:33 GMT-0600 (Central Standard Time)
      const diff = now.getTime() - BIRTHDAY.getTime();

      // Use 365.25 days per year to account for leap years
      const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
      const years = Math.floor(diff / millisecondsPerYear);
      const remainingMs = diff % millisecondsPerYear;

      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const days = Math.floor(remainingMs / millisecondsPerDay);
      const remainingMsAfterDays = remainingMs % millisecondsPerDay;

      const millisecondsPerHour = 1000 * 60 * 60;
      const hours = Math.floor(remainingMsAfterDays / millisecondsPerHour) % 12;
      const remainingMsAfterHours = remainingMsAfterDays % millisecondsPerHour;

      const millisecondsPerMinute = 1000 * 60;
      const minutes = Math.floor(remainingMsAfterHours / millisecondsPerMinute);

      setAge({ years, days, hours, minutes });
    }

    getAge();
    const interval = setInterval(getAge, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="flex flex-col items-center justify-center relative">
      <motion.div className="group">
        <motion.div
          className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
          whileHover={{ scale: 0.95 }}
        >
          <motion.span className="text-2xl font-medium select-none">
            {age.years} y/o
          </motion.span>
        </motion.div>

        <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
          <div className="bg-white shadow-lg text-black px-6 py-3 rounded-lg text-base whitespace-nowrap flex items-center gap-3">
            <span>{age.years}y</span>
            <span className="animate-pulse">:</span>
            <span>{age.days}d</span>
            <span className="animate-pulse">:</span>
            <span>{age.hours}h</span>
            <span className="animate-pulse">:</span>
            <span>{age.minutes}m</span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-8 border-transparent border-t-white" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
