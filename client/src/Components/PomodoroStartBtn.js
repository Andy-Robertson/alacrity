import React from "react";
import { GrPlayFill } from "react-icons/gr";

const PomodoroStartBtn = ({ startTimer }) => {
  return (
    <button
      type="button"
      onClick={startTimer}
      className="pomodoro-startStop-btn pomodoro-btn-interaction pomodoro-btn"
    >
      <GrPlayFill />
    </button>
  );
};

export default PomodoroStartBtn;
