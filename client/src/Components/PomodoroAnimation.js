import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const addDigitPadding = (time) => time.toString().padStart(2, 0);

const PomodoroAnimation = ({ timeLeftInSeconds, totalTimeInSeconds }) => {
  const minutes = addDigitPadding(Math.floor(timeLeftInSeconds / 60));
  const seconds = addDigitPadding(timeLeftInSeconds - minutes * 60);
  const percentage = Math.round((timeLeftInSeconds / totalTimeInSeconds) * 100) / 100;

  return (
    <span className="pomodoro-animation-wrapper">
      <CircularProgressbar
        value={percentage}
        maxValue={1}
        text={`${minutes} : ${seconds}`}
        strokeWidth={5}
        counterClockwise
        styles={buildStyles({
          textColor: "#000000",
          trailColor: "rgba(147, 197, 252, 0.4)",
          pathColor: "#e0c3fc",
        })}
      />
    </span>
  );
};

export default PomodoroAnimation;
