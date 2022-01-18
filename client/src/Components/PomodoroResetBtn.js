import React from "react";
import { GrPowerReset } from "react-icons/gr";

const PomodoroResetBtn = () => {
  return (
    <button type="button" className="pomodoro-reset-btn pomodoro-btn">
      <span className="btn__text">
        <GrPowerReset />
      </span>
    </button>
  );
};

export default PomodoroResetBtn;
