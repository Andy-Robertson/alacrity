import React, { useState } from "react";

import PlusImg from "../Assets/img/plus-math-30.png";
import PlayImg from "../Assets/img/play.png";
import Popup from "../Components/Popup";

const RightSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside className="right-sidebar">
            <div className="img-circular"></div>
            <p>Peter Parker</p>
            <button type="button" className="btn" onClick={() => {setIsOpen(true)}}>
                <span className="btn__icon"><img src={PlusImg} alt="add tasks icon"></img></span>
                <span className="btn__text">Add Task</span>
            </button>
            <div></div>
            <button className="btn_pomodoro">
                <span className="btn__text">Start Pomodoro</span>
                <span className="btn__icon"><img src={PlayImg} alt="Play icon"></img></span>
            </button>
            {isOpen && <Popup close={setIsOpen}/>}
            
        </aside>
    );
}

export default RightSideBar;