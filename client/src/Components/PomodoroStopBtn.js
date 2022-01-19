import React from "react";
import { GrPauseFill } from "react-icons/gr";

const PomodoroStopBtn = ({ stopTimer }) => {
  return (
    <button
      type="button"
      onClick={stopTimer}
      className="pomodoro-startStop-btn pomodoro-btn-interaction pomodoro-btn"
    >
      <GrPauseFill />
    </button>
  );
};

export default PomodoroStopBtn;
