import React from "react";

import PlusImg from '../Assets/img/plus-math-30.png';
import PlayImg from '../Assets/img/play.png';

const RightSideBar = () => {
    return (
        <aside className="right-sidebar">
            <div className="img-circular"></div>
            <p>Peter Parker</p>
            <button className="btn">
                <span className="btn__icon"><img src={PlusImg} alt="add tasks icon"></img></span>
                <span className="btn__text">Add Task</span>
            </button>
            <div></div>
            <button className="btn_pomodoro">
                <span className="btn__text">Start Pomodoro</span>
                <span className="btn__icon"><img src={PlayImg} alt="Play icon"></img></span>
            </button>
        </aside>
    );
}

export default RightSideBar;