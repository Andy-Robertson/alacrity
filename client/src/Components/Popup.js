import React, { useState } from "react";
import Toggle from "./Toggle";

const Popup = props => {
    const [toggled, setToggled] = useState(false);
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={() => props.close(false)}>x</span>
                <form className="form">
                    <div>
                        <input
                            type="text"
                            name="task-subject"
                            placeholder="Task Subject"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                        />
                    </div>
                    <h4>Sub Tasks</h4>
                    <Toggle handleCheck={(evt) => setToggled(evt.target.checked)} />
                    {/* <p> the button is {toggled ? "on" : "off"}</p> */}
                    {toggled ? <div>
                        <input
                            type="text"
                            name="sub-task"
                            placeholder="Sub Task"
                        />
                    </div> : null}
                    <div>
                        <input
                            type="text"
                            name="reward"
                            placeholder="Reward"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="resources"
                            placeholder="resources"
                        />
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Popup;