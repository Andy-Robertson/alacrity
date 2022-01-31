import React, { useState, useContext } from "react";
import { GlobalContext } from "../../Contexts/GlobalContext";

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
        <h5 className="settings-sub-heading">Set Custom Time</h5>
        <div className="form-pomodoro settings-container-pomodoro">
          <div className="form-spacing">
            <input
              type="text"
              name="set-minutes"
              placeholder="Minutes"
              maxLength="2"
              pattern="[0-9]+"
              onChange={(e) => handleTimeChange(e)}
            />
          </div>

          <div className="form-spacing">
            <input
              type="text"
              name="set-seconds"
              placeholder="Seconds"
              maxLength="2"
              pattern="[0-9]+"
              onChange={(e) => handleTimeChange(e)}
            />
          </div>
          <button className="settings-popup-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default SiteSettingsPomodoro;
