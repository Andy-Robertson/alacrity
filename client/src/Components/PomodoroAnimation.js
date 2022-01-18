import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PomodoroAnimation = () => {
  const value = 0.66;
  const minutes = 3;
  const seconds = 25;
  return (
    <span className="pomodoro-animation-wrapper">
      <CircularProgressbar
        value={value}
        maxValue={1}
        text={`${minutes} : ${seconds}`}
        styles={buildStyles({
          textColor: "#000000",
          trailColor: "rgba(147, 197, 252, 0.4)",
          backgroundColor: "#e0c3fc",
          pathColor: "#e0c3fc",
        })}
      />
    </span>
  );
};

export default PomodoroAnimation;
