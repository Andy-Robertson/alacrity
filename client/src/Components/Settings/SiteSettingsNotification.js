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
     console.log(enableNotificationSound);
    setEnableNotificationSound(!enableNotificationSound);
  };

  const handleEnableNotificationToggle = () => {
    console.log(enableNotifications);
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
          inputId={"toggle-notifications-input"}
          labelId={"toggle-notifications-label"}
        />
      </div>

      <h5 className="settings-sub-heading">Enable Sound</h5>
      <div className="settings-container-notifications">
        <CheckboxToggle
          handleCheck={handleEnableSoundToggle}
          checked={enableNotificationSound}
          inputId={"toggle-notification-sound-input"}
          labelId={"toggle-notification-sound-label"}
        />
      </div>
    </section>
  );
};

export default SiteSettingsNotification;
