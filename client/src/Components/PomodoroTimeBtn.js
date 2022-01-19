import React from "react";

const PomodoroTimeBtn = ({ btnText }) => {
  return (
    <button
      type="button"
      value={btnText}
      className="pomodoro-btn pomodoro-btn-interaction pomodoro-time-btn"
    >
      <span className="pomodoro-btn-time btnColor">{btnText}</span>
    </button>
  );
};

export default PomodoroTimeBtn;
