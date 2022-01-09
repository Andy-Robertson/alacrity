import React from "react";

import PlusImg from "../Assets/img/plus-math-30.png";
import PlayImg from "../Assets/img/play.png";

const RightSideBar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <aside className="right-sidebar">
      {user && (
        <ul onClick={logout} className="rightToLeft">
          <li>
            <img
              src={user.photos[0].value}
              alt=""
              className="img-circular"
            ></img>
          </li>
          <li className="right-sidebar-li">Sign-out</li>
        </ul>
      )}
      {user && (
        <button className="btn rightToLeft">
          <span className="btn__icon">
            <img src={PlusImg} alt="add tasks icon"></img>
          </span>
          <span className="btn__text">Add Task</span>
        </button>
      )}
      {user && (
        <button className="btn_pomodoro rightToLeft">
          <span className="btn__text">Start Pomodoro</span>
          <span className="btn__icon">
            <img src={PlayImg} alt="Play icon"></img>
          </span>
        </button>
      )}
    </aside>
  );
};

export default RightSideBar;
