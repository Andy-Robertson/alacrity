import Pomodoro from "./Pomodoro";


const PomodoroMobilePopup = (props) => {

  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="popup-box animate__animated animate__fadeIn"
      onClick={() => props.close(false)}
    >
      <div
        className="box animate__animated animate__fadeInUpBig"
        onClick={(e) => handlePropagation(e)}
      >
        <h2>Pomodoro test!</h2>
        <Pomodoro/>

        <div className="buttons">
          <button className="btn cancel" onClick={() => props.close(false)}>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroMobilePopup;
