import React, { useState } from "react";
import Logo from "../Assets/img/logo.svg";
import DashBoardImg from "../Assets/img/dashboard-24.png";
import PieChartImg from "../Assets/img/pie-chart-24.png";
import SettingsImg from "../Assets/img/settings-24.png";
import SiteSettingsPopup from "../Components/Settings/SiteSettingsPopup";

const LeftSideBar = ({ user }) => {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  return (
    <aside className="left-sidebar">
      <img src={Logo} alt="logo"></img>
      {user && (
        <div className="items animate__animated animate__fadeInLeftBig">
          <div>
            <a href="#left-sidebar">
              <img src={DashBoardImg} alt="dashboard logo"></img>
              <span>Dashboard</span>
            </a>
          </div>
          <div>
            <a href="#">
              <img src={PieChartImg} alt="Analytics logo"></img>
              <span>Analytics</span>
            </a>
          </div>
          <div
            onClick={() => {
              setSettingsIsOpen(true);
            }}
            className="settings-btn"
          >
            <img src={SettingsImg} alt="settings logo"></img>
            <span>Settings</span>
          </div>
        </div>
      )}
      {settingsIsOpen && <SiteSettingsPopup close={setSettingsIsOpen} />}
    </aside>
  );
};

export default LeftSideBar;
