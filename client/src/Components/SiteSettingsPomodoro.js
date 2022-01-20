import React, { useState, useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";

const SiteSettingsPomodoro = () => {
  const { setSeconds, setMinutes } = useContext(GlobalContext);
  const [formMinutes, setFormMinutes] = useState(0);
  const [formSeconds, setFormSeconds] = useState(0);

  const setCustomPomodoroTime = (e) => {
    e.preventDefault();

    setMinutes(parseInt(formMinutes));
    setSeconds(parseInt(formSeconds));
  };

  const handleTimeChange = (e) => {
    e.target.name === "set-minutes"
      ? setFormMinutes(e.target.value)
      : setFormSeconds(e.target.value);
  };

  return (
    <section>
      <h3>Pomodoro</h3>
      <form className="form" onSubmit={setCustomPomodoroTime}>
        <div className="form-pomodoro pomodoro-settings-container">
          <div className="form-spacing">
            <input
              type="number"
              name="set-minutes"
              placeholder="Minutes"
              onChange={(e) => handleTimeChange(e)}
            />
          </div>

          <div className="form-spacing">
            <input
              type="number"
              name="set-seconds"
              placeholder="Seconds"
              onChange={(e) => handleTimeChange(e)}
            />
          </div>
          <button className="settings-popup-btn" type="submit">
            Update Time
          </button>
        </div>
      </form>
    </section>
  );
};

export default SiteSettingsPomodoro;
