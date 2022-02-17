import SiteSettingsPomodoro from "./SiteSettingsPomodoro";
import SiteSettingsNotification from "./SiteSettingsNotification";

const SiteSettingsPopup = (props) => {
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
        <h2>Settings</h2>
        <SiteSettingsPomodoro />
        <SiteSettingsNotification />
        <div className="buttons">
          <button className="btn cancel" onClick={() => props.close(false)}>
            <span>OK</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsPopup;
