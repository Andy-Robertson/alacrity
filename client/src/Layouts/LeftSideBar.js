import React from "react";
// import Logo from '../Assets/img/logo.svg';
import DashBoardImg from '../Assets/img/dashboard-24.png';
import PieChartImg from '../Assets/img/pie-chart-24.png';
import SettingsImg from '../Assets/img/settings-24.png';

const LeftSideBar = () => {
    return (
        <aside className="left-sidebar">
            {/* {console.log(DashBoardImg)} */}
        <img src="logo.svg" alt="logo"></img>
        <div className="items">
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
          <div>
            <a href="#">
              <img src={SettingsImg} alt="settings logo"></img>
              <span>Settings</span>
            </a>
          </div>
        </div>
      </aside>
    );
}

export default LeftSideBar;