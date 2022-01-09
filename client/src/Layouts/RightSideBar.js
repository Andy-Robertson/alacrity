import React, { useState } from "react";

import PlusImg from "../Assets/img/plus-math-30.png";
import PlayImg from "../Assets/img/play.png";
import Popup from "../Components/Popup";


const RightSideBar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const logout = () => {
      window.open("http://localhost:5000/auth/logout", "_self");
    };
  return (
    <aside className="right-sidebar">
      {user && (
        <ul onClick={logout} className="right-animation">
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
        <button type="button" className="btn right-animation" onClick={() => {setIsOpen(true)}}>
          <span className="btn__icon">
            <img src={PlusImg} alt="add tasks icon"></img>
          </span>
          <span className="btn__text">Add Task</span>
        </button>
      )}
      {user && (
        <button type="button" className="btn_pomodoro right-animation">
          <span className="btn__text">Start Pomodoro</span>
          <span className="btn__icon">
            <img src={PlayImg} alt="Play icon"></img>
          </span>
        </button>
      )}
      {isOpen && <Popup close={setIsOpen}/>}
    </aside>
  );
};

export default RightSideBar;
