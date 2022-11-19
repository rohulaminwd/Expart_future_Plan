import { useEffect, useState } from "react";


const useTimer = (date) => {

    const [timeLefts, setTimeLeft] = useState();


    const calculateTimeLeft = () => {

        let difference = +new Date(date) - +new Date();

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
            };
        }else{
          timeLeft = {
            dateOver: true,
          }
        }

        return timeLeft;
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearTimeout(timer);
    }, [calculateTimeLeft()]);


    return [timeLefts];
};

export default useTimer;