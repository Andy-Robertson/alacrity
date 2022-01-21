import React, { useState, useEffect, useRef, useContext } from "react";
import PomodoroAnimation from "./PomodoroAnimation";
import Button from "./button";
import { GrPowerReset, GrPauseFill, GrPlayFill } from "react-icons/gr";
import workComplete from "../Assets/audio/success-sound-effect.mp3";
import { GlobalContext } from "../Contexts/GlobalContext";

const Pomodoro = () => {
  const workCompleteSound = new Audio(workComplete);
  const { seconds, setSeconds, minutes, setMinutes } = useContext(GlobalContext);

  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [activeMode, setActiveMode] = useState("custom");
  const [pomodoroSessionEnded, setPomodoroSessionEnded] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    if (pomodoroSessionEnded) {
      workCompleteSound.play();
    } else {
      return null;
    }
  }, [pomodoroSessionEnded]);

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
          setPomodoroSessionEnded(false);
          return timeLeftInSeconds - 1;
        } else {
          setPomodoroSessionEnded(true);
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
    if (e.target.value === "Focus") {
      setActiveMode("Focus");
      setMinutes(25);
      setSeconds(0);
    } else if (e.target.value === "Rest") {
      setActiveMode("Rest");
      setMinutes(5);
      setSeconds(0);
    } else {
      setActiveMode("Break");
      setMinutes(30);
      setSeconds(0);
    }
  };

  const INACTIVE = "pomodoro-btn-interaction pomodoro-time-btn";
  const ACTIVE = "pomodoro-btn-interaction pomodoro-time-btn pomodoro-time-btn-active";

  return (
    <section className="pomodoro-wrapper right-animation">
      <span className="pomodoro-time-selector-wrapper">
        <Button
          type={activeMode === "Focus" ? ACTIVE : INACTIVE}
          handleClick={handleTimeSelect}
          children={"Focus"}
          value={"Focus"}
        />

        <Button
          type={activeMode === "Rest" ? ACTIVE : INACTIVE}
          handleClick={handleTimeSelect}
          children={"Rest"}
          value={"Rest"}
        />

        <Button
          type={activeMode === "Break" ? ACTIVE : INACTIVE}
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
