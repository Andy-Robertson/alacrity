import React from "react";

const PomodoroTimeBtn = ({ btnIcon, btnText }) => {
  return (
    <button type="button" className="pomodoro-btn pomodoro-time-btn">
      <span className="pomodoro-btn-time btnColor">{btnIcon} {btnText}</span>
    </button>
  );
};

export default PomodoroTimeBtn;
