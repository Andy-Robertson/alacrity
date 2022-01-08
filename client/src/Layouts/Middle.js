import React from "react";
import Tabs from "../Components/Tabs";
import TasksData from "../Assets/data/cards_data.json";


const Middle = () => {
    return (
        // Start of wrapper setion
        <section className="wrapper">
            <div className="wrapper__text">
                <h3>Welcome Back Peter!</h3>
                <h2>You've got 5 tasks today</h2>
            </div>
            {/* Start of wrapper ards div */}
            <div className="wrapper__cards">
                <Tabs data={TasksData}/>
            {/* End of wrapper ards div */}
            </div>
            {/* Start of the bakground div */}
            <div className="wrapper__bk">
                <div>
                    <h4>" The only difference between success and failure is the ability to take action."</h4>
                    <small>Alexander Graham Bell</small>
                </div>
                {/* End of the bakground div */}
            </div>
            {/* End of wrapper setion */}
        </section>
    );
};

export default Middle;