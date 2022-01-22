import React, {  } from "react";
import Tabs from "../Components/Tabs";

const Middle = ({ user, taskData }) => {
  const todayDate = new Date().getDate();
  const todayData = taskData.filter(
    (ele) => new Date(ele.by_date).getDate() === todayDate
  );
  return (
    // Start of wrapper setion
    <section className="wrapper">
      <div className="wrapper__text">
        <h3>Welcome back {user.displayName}!</h3>
        <h2>You've got {todayData.length} tasks today</h2>
      </div>
      {/* Start of wrapper ards div */}
      <div className="wrapper__cards">
        {taskData.length > 0 && <Tabs data={taskData} />}
        {/* End of wrapper ards div */}
      </div>
      {/* Start of the bakground div */}
      <div className="wrapper__bk">
        <div>
          <h4>
            " The only difference between success and failure is the ability to
            take action."
          </h4>
          <small>Alexander Graham Bell</small>
        </div>
        {/* End of the bakground div */}
      </div>
      {/* End of wrapper setion */}
    </section>
  );
};

export default Middle;
