import SiteSettingsPomodoro from "./SiteSettingsPomodoro";

const SiteSettingsPopup = (props) => {
  return (
    <div className="popup-box" >
      <div className="box">
        <span className="close-icon" onClick={() => props.close(false)}>
          x
        </span>
        <h2>Settings</h2>
        <SiteSettingsPomodoro props={props}/>
      </div>
    </div>
  );
};

export default SiteSettingsPopup;
