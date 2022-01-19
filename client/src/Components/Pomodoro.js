import React, { useState, useEffect, useRef } from "react";
import PomodoroAnimation from "./PomodoroAnimation";
import Button from "./button";
import { GrPowerReset } from "react-icons/gr";
import { GrPauseFill } from "react-icons/gr";
import { GrPlayFill } from "react-icons/gr";

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
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

  const handleStartTimer = () => {
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

  const handleStopTimer = () => {
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

  const handleResetTimer = () => {
    setTimerActive(false);
    clearInterval(interval.current);
    interval.current = null;
    setTimeLeftInSeconds(totalTimeInSeconds);
  };

  const handleTimeSelect = (e) => {
    console.log(e.target.value);
    if (e.target.value === "Focus") {
      setMinutes(25);
    } else if (e.target.value === "Rest") {
      setMinutes(5);
    } else {
      setMinutes(30);
    }
  };

  return (
    <section className="pomodoro-wrapper ">
      <span className="pomodoro-time-selector-wrapper">
        <Button
          type={"pomodoro-btn-interaction pomodoro-time-btn"}
          handleClick={handleTimeSelect}
          children={"Focus"}
          value={"Focus"}
        />

        <Button
          type={"pomodoro-btn-interaction pomodoro-time-btn"}
          handleClick={handleTimeSelect}
          children={"Rest"}
          value={"Rest"}
        />

        <Button
          type={"pomodoro-btn-interaction pomodoro-time-btn"}
          handleClick={handleTimeSelect}
          children={"Break"}
          value={"Break"}
        />
      </span>

      <PomodoroAnimation
        timeLeftInSeconds={timeLeftInSeconds}
        totalTimeInSeconds={totalTimeInSeconds}
      />

      <span className="pomodoro-start-reset-wrapper">
        {!timerActive && (
          <Button
            type={"pomodoro-startStop-btn pomodoro-btn-interaction"}
            handleClick={handleStartTimer}
            children={<GrPlayFill />}
          />
        )}

        {timerActive && (
          <Button
            type={"pomodoro-startStop-btn pomodoro-btn-interaction"}
            handleClick={handleStopTimer}
            children={<GrPauseFill />}
          />
        )}

        <Button
          type={"pomodoro-reset-btn pomodoro-btn-interaction-reset"}
          handleClick={handleResetTimer}
          children={<GrPowerReset />}
        />
      </span>
    </section>
  );
};

export default Pomodoro;
