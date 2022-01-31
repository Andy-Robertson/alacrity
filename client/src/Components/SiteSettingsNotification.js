import React, { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";
import Toggle from "../Components/AddTask/Toggle";

const SiteSettingsNotification = () => {
  const { enableNotificationSound, setEnableNotificationSound } = useContext(GlobalContext);

  const handleEnableSoundToggle = () => {
    setEnableNotificationSound(!enableNotificationSound);
  };

  return (
    <section>
      <h3>Notifications</h3>
      <h5 className="settings-sub-heading">Enable Sound</h5>
      <div className="settings-container-notifications">
        <Toggle
          handleCheck={handleEnableSoundToggle}
          checked={enableNotificationSound}
        />
      </div>
    </section>
  );
};

export default SiteSettingsNotification;
