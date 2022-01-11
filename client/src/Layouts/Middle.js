import React from "react";
import Tabs from "../Components/Tabs";
import TasksData from "../Assets/data/cards_data.json";

const Middle = ({ user }) => {
  return (
    // Start of wrapper section
    <section className="wrapper">
      <div className="wrapper__text">
        <h3>{user.displayName}!</h3>
        <h2>You've got 5 tasks today</h2>
      </div>
      {/* Start of wrapper ards div */}
      <div className="wrapper__cards">
        <Tabs data={TasksData} />
        {/* End of wrapper ards div */}
      </div>
      {/* Start of the background div */}
      <div className="wrapper__bk">
        <div>
          <h4>
            " The only difference between success and failure is the ability to
            take action."
          </h4>
          <small>Alexander Graham Bell</small>
        </div>
        {/* End of the background div */}
      </div>
      {/* End of wrapper section */}
    </section>
  );
};

export default Middle;
