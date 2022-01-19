import React from "react";
import { GrPowerReset } from "react-icons/gr";

const PomodoroResetBtn = ({ resetTimer }) => {
  return (
    <button
      type="button"
      onClick={resetTimer}
      className="pomodoro-reset-btn pomodoro-btn-interaction-reset pomodoro-btn"
    >
      <span className="btn__text">
        <GrPowerReset />
      </span>
    </button>
  );
};

export default PomodoroResetBtn;
