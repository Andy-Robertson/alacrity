import React, { useState, useEffect } from "react";
import Pans from "./Pans";
import Logo from "../Assets/img/logo.svg";

const Tabs = (props) => {
  const [data, setData] = useState(props.data);
  const todayDate = new Date().getDate();
  const [isToday, setIsToday] = useState(true);
  const [isTmr, setIsTmr] = useState(false);
  const [isLater, setIsLater] = useState(false);
  // variabales for clock;
  const [clockState, setClockState] = useState("");
  const todayData = data.filter(
    (ele) => new Date(ele.by_date).getDate() === todayDate
  );
  const tmrData = data.filter(
    (ele) => new Date(ele.by_date).getDate() === todayDate + 1
  );
  const laterData = data.filter(
    (ele) =>
      new Date(ele.by_date).getDate() !== todayDate + 1 && new Date(ele.by_date).getDate() !== todayDate
  );
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  function handleClick(e, taskDate) {
    e.preventDefault();
    if (taskDate === "today") {
      setIsToday(true);
      setIsTmr(false);
      setIsLater(false);
    } else if (taskDate === "tmr") {
      setIsToday(false);
      setIsTmr(true);
      setIsLater(false);
    } else {
      setIsToday(false);
      setIsTmr(false);
      setIsLater(true);
    }
  }
  // Generate Clock
  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString("en-GB"));
    }, 1000);
  }, []);
  // Notification Function
  function notify(title, body) {
    let options = {
      body: body,
      icon: Logo,
    };
    const notification = new Notification(title, options);
    // console.log(notification.timestamp);
    notification.onclick = () => {
      window.open("https://localhost:3000"); // redirect to new page -- Challenge
    };

    setTimeout(notification.close.bind(), 3000);
  }
  // Notification Calling For every morning
  const notificationCall = () => {
    let title = "General Notification";
    let body = `Hi there, you have ${todayData.length} tasks should be done by today`;
    notify(title, body);
  };
  if (clockState === "08:00:00") {
    // console.log("true");
    notificationCall();
  }
  // Notification Calling For each task of today's tasks
  const notificationCallTask = (title, body) => {
    notify(title, body);
  };
  todayData.map((task) => {
    let title = "Task Notification";
    let body = `Hi there, do not forget ${task.task_subject} Pleas!`;
    // console.log(task.by_time.toString());
    if (clockState === task.by_time.toString()) {
      notificationCallTask(title, body);
    }
  });
  return (
    <>
      <ul className="tabs">
        <li>
          <a href="#" onClick={(e) => handleClick(e, "today")}>
            Today
          </a>{" "}
        </li>
        <li>
          <a href="#" onClick={(e) => handleClick(e, "tmr")}>
            Tomorow
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => handleClick(e, "later")}>
            Later
          </a>
        </li>
      </ul>
      {isToday && (
        <Pans data={todayData} submitComplete={props.submitComplete} />
      )}
      {isTmr && <Pans data={tmrData} submitComplete={props.submitComplete} />}
      {isLater && (
        <Pans data={laterData} submitComplete={props.submitComplete} />
      )}
    </>
  );
};

export default Tabs;
