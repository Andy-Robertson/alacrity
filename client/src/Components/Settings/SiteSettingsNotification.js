import React, { useContext } from "react";
import { GlobalContext } from "../../Contexts/GlobalContext";
import CheckboxToggle from "./CheckboxToggle";

const SiteSettingsNotification = () => {
  const {
    enableNotificationSound,
    setEnableNotificationSound,
    enableNotifications,
    setEnableNotifications,
  } = useContext(GlobalContext);

  const handleEnableSoundToggle = () => {
    setEnableNotificationSound(!enableNotificationSound);
  };

  const handleEnableNotificationToggle = () => {
      setEnableNotifications(!enableNotifications);
  };

  return (
    <section>
      <h3>Notifications</h3>

      <h5 className="settings-sub-heading">Enable Notifications</h5>
      <div className="settings-container-notifications">
        <CheckboxToggle
          handleCheck={handleEnableNotificationToggle}
          checked={enableNotifications}
          inputId={"toggle-not-input"}
          labelId={"toggle-not-label"}
          for={"toggle-not-input"}
          name={"toggle-not-input"}
        />
      </div>

      <h5 className="settings-sub-heading">Enable Sound</h5>
      <div className="settings-container-notifications">
        <CheckboxToggle
          handleCheck={handleEnableSoundToggle}
          checked={enableNotificationSound}
          inputId={"toggle-not-sound-input"}
          labelId={"toggle-not-sound-label"}
          for={"toggle-not-sound-input"}
          name={"toggle-not-sound-input"}
        />
      </div>
    </section>
  );
};

export default SiteSettingsNotification;
