import React from "react";
import PomodoroAnimation from "./PomodoroAnimation";
import PomodoroResetBtn from "./PomodoroResetBtn";
import PomodoroStartBtn from "./PomodoroStartBtn";
import PomodoroTimeBtn from "./PomodoroTimeBtn";

const Pomodoro = () => {
  return (
    <section className="pomodoro-wrapper right-animation">
      <span className="pomodoro-time-selector-wrapper">
        <PomodoroTimeBtn btnText={"Focus"} />
        <PomodoroTimeBtn btnText={"Rest"} />
        <PomodoroTimeBtn btnText={"Long Rest"} />
      </span>

      <PomodoroAnimation />

      <span className="pomodoro-start-reset-wrapper">
        <PomodoroStartBtn />
        <PomodoroResetBtn />
      </span>
    </section>
  );
};

export default Pomodoro;
