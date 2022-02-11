import React, { useState, useContext } from "react";

import { GlobalContext } from "../Contexts/GlobalContext";

import Logo from "../Assets/img/logo.svg";
import DashBoardImg from "../Assets/img/dashboard-24.png";
import PieChartImg from "../Assets/img/pie-chart-24.png";
import SettingsImg from "../Assets/img/settings-24.png";
import SiteSettingsPopup from "../Components/Settings/SiteSettingsPopup";

const LeftSideBar = ({ user }) => {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const { isTaskFocused, isAnalyticsFocused, setIsAnalyticsFocused } = useContext(GlobalContext);

  return (
    <aside className="left-sidebar">
      {user && !isTaskFocused && !isAnalyticsFocused && (
        <img src={Logo} alt="logo"></img>
      )}

      {user && (isTaskFocused || isAnalyticsFocused) && (
        <div
          onClick={() => {
            setSettingsIsOpen(true);
          }}
          className="settings-btn settings-btn-focus-mode animate__animated animate__fadeIn animate__delay-1s"
        >
          <img src={SettingsImg} alt="settings logo"></img>
        </div>
      )}

      {user && ( !isTaskFocused && !isAnalyticsFocused) && (
        <>
          <div
            id="menuBigScreen"
            className="items animate__animated animate__fadeInLeftBig"
          >
            <div>
              <a href="#left-sidebar">
                <img src={DashBoardImg} alt="dashboard logo"></img>
                <span>dashboard</span>
              </a>
            </div>
            <div
              onClick={() => setIsAnalyticsFocused(true)}
              className="analytics-btn"
            >
              <a>
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
          {/* for smaller screen */}
          <nav role="navigation">
            <div id="menuToggle">
              {/* A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it. */}
              <input type="checkbox" />

              {/* Some spans to act as a hamburger. */}
              <span></span>
              <span></span>
              <span></span>

              {/* Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic.*/}
              <ul id="menu">
                <a href="#left-sidebar">
                  <li className="menu-li">
                    <img src={DashBoardImg} alt="dashboard logo"></img>
                    <div className="menu-div">Dashboard</div>
                  </li>
                </a>
                <a href="#" onClick={() => setIsAnalyticsFocused(true)}>
                  <li className="menu-li">
                    <img src={PieChartImg} alt="Analytics logo"></img>
                    <div className="menu-div">Analytics</div>
                  </li>
                </a>
                <a>
                  <li className="menu-li">
                    <div
                      onClick={() => {
                        setSettingsIsOpen(true);
                      }}
                      className="settings-btn"
                    >
                      <img src={SettingsImg} alt="settings logo"></img>
                      <div className="menu-div">Settings</div>
                    </div>
                  </li>
                </a>
              </ul>
            </div>
          </nav>
        </>
      )}
      {settingsIsOpen && <SiteSettingsPopup close={setSettingsIsOpen} />}
    </aside>
  );
};

export default LeftSideBar;
