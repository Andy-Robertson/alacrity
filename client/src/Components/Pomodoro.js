import React, { useState, useEffect, useRef } from "react";
import PomodoroAnimation from "./PomodoroAnimation";
import PomodoroResetBtn from "./PomodoroResetBtn";
import PomodoroStartBtn from "./PomodoroStartBtn";
import PomodoroStopBtn from "./PomodoroStopBtn";
import PomodoroTimeBtn from "./PomodoroTimeBtn";

const Pomodoro = () => {
  const [minutes] = useState(25);
  const [seconds] = useState(0);
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    setTotalTimeInSeconds(minutes * 60 + seconds);
  }, [minutes, seconds]);

  useEffect(() => {
    setTimeLeftInSeconds(totalTimeInSeconds);
  }, [totalTimeInSeconds]);

  const startTimer = () => {
    // Prevent multiple intervals.
    if (interval.current !== null) {
      return;
    }

    setTimerActive(true);

    interval.current = setInterval(() => {
      setTimeLeftInSeconds((timeLeftInSeconds) => {
        if (timeLeftInSeconds >= 1) {
          return timeLeftInSeconds - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    //Prevent multiple clear intervals.
    if (interval.current === null) {
      return;
    }

    setTimerActive(false);
    clearInterval(interval.current);
    // Reset ref to null enabling `startTimer` calls to meet the `interval.current`
    // check if timer has already started.
    interval.current = null;
  };

  const resetTimer = () => {
    setTimerActive(false);
    clearInterval(interval.current);
    interval.current = null;
    setTimeLeftInSeconds(totalTimeInSeconds);
  };

  return (
    <section className="pomodoro-wrapper ">
      <span className="pomodoro-time-selector-wrapper">
        <PomodoroTimeBtn btnText={"Focus"} />
        <PomodoroTimeBtn btnText={"Rest"} />
        <PomodoroTimeBtn btnText={"Break"} />
      </span>

      <PomodoroAnimation
        timeLeftInSeconds={timeLeftInSeconds}
        totalTimeInSeconds={totalTimeInSeconds}
      />

      <span className="pomodoro-start-reset-wrapper">
        {!timerActive && <PomodoroStartBtn startTimer={startTimer} />}
        {timerActive && <PomodoroStopBtn stopTimer={stopTimer} />}

        <PomodoroResetBtn resetTimer={resetTimer} />
      </span>
    </section>
  );
};

export default Pomodoro;
