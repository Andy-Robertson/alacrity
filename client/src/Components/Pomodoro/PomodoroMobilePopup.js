import Pomodoro from "./Pomodoro";

const PomodoroMobilePopup = ({ close, isPomodoroOpen }) => {
  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="popup-box animate__animated animate__fadeIn"
      onClick={() => close(false)}
    >
      <div
        className="pomodoro-popup-wrapper animate__animated animate__fadeInUpBig"
        onClick={(e) => handlePropagation(e)}
      >
        <Pomodoro isPomodoroOpen={isPomodoroOpen} />

        <div className="buttons">
          <button className="btn cancel" onClick={() => close(false)}>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroMobilePopup;
