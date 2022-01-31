import React, { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";

const SiteSettingsNotification = () => {
  const { enableNotificationSound, setEnableNotificationSound } = useContext(GlobalContext);

  const handleEnableSoundToggle = () => {
    setEnableNotificationSound(!enableNotificationSound);
    console.log(enableNotificationSound);
  };

  return (
    <section>
      <h3>Notifications</h3>

      <div className="notification-settings-container">
        <div className="notification-setting-sound-toggle">
          <label id="enable-notifications-label-sound" htmlFor="enable-notification-sound">Enable Sound</label>
          <input
            type="checkbox"
            id="enable-notification-sound"
            name="enable-notification-sound"
            onClick={handleEnableSoundToggle}
            defaultChecked={enableNotificationSound}
          />
        </div>
      </div>
    </section>
  );
};

export default SiteSettingsNotification;
