import React, { useState, useContext } from "react";

import { GlobalContext } from "../Contexts/GlobalContext";

import PlusImg from "../Assets/img/plus-math-30.png";
import Popup from "../Components/Popup";
import placeholderAvatar from "../Assets/img/avatar-placeholder.png";
import Pomodoro from "../Components/Pomodoro/Pomodoro";

const RightSideBar = ({ user, SERVER_URL, submitComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isTaskFocused } = useContext(GlobalContext);
  const logout = () => {
    window.open(`${SERVER_URL}/auth/logout`, "_self");
  };
  return (
    <aside className="right-sidebar">
      {user && !isTaskFocused && (
        <ul
          onClick={logout}
          className="animate__animated animate__fadeInRightBig"
        >
          <li>
            <img
              src={user.avatar ? user.avatar : placeholderAvatar}
              alt=""
              className="img-circular"
            ></img>
          </li>
          <li className="right-sidebar-li">Sign-out</li>
        </ul>
      )}
      {user && !isTaskFocused && (
        <div className="btn-wrapper">
          <button
            type="button"
            className="btn animate__animated animate__fadeInRightBig"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <span className="btn__icon">
              <img src={PlusImg} alt="add tasks icon"></img>
            </span>
            <span className="btn__text">Add Task</span>
          </button>

          {/* small screen pomdoro */}
          <button
            type="button"
            className="btn btn-small-screen animate__animated animate__fadeInRightBig"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <span className="btn__icon">
              <img src={PlusImg} alt="add tasks icon"></img>
            </span>
            <span className="btn__text">Pomodoro</span>
          </button>
        </div>

      )}
      {isOpen && <Popup close={setIsOpen} submitComplete={submitComplete} />}
      {user && !isTaskFocused && <Pomodoro />}
    </aside>
  );
};

export default RightSideBar;
