import React, { useState, useEffect } from "react";
import Pans from "./Pans";
import Logo from "../Assets/img/logo.svg";

const Tabs = (props) => {
  const [data, setData] = useState(props.data);
  const todayDate = new Date().getDate();
  const [isToday, setIsToday] = useState(true);
  const [isTmr, setIsTmr] = useState(false);
  const [isLater, setIsLater] = useState(false);
  const [taskIsArchived, setIsArchived] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const todayData = data.filter(
    (ele) => new Date(ele.by_date).getDate() === todayDate
  );
  const tmrData = data.filter(
    (ele) => new Date(ele.by_date).getDate() === todayDate + 1
  );
  const laterData = data.filter(
    (ele) =>
      new Date(ele.by_date).getDate() !== todayDate + 1
      && new Date(ele.by_date).getDate() !== todayDate
  );
  let intervalId = null;
  useEffect(() => {
    setData(props.data);
    if (intervalId){
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      const date = new Date();
      const needsNotification = [];
      props.data.forEach((ele) => {

      if (ele.by_time.toString() === date.toLocaleTimeString("en-GB")) {
          console.log("pushing");
          needsNotification.push(ele);
        }
      });
      if (needsNotification.length > 0) {
        console.log("setting");
        setNotifications(needsNotification);
      }
    }, 1000);
  }, [props.data]);

  const todayData = data.filter(
    (ele) =>
      new Date(ele.by_date).getDate() === todayDate
      && ele.task_archived === false
  );

  const tmrData = data.filter(
    (ele) =>
      new Date(ele.by_date).getDate() === todayDate + 1
      && ele.task_archived === false
  );

  const laterData = data.filter(
    (ele) =>
      new Date(ele.by_date).getDate() !== todayDate + 1
      && new Date(ele.by_date).getDate() !== todayDate
      && ele.task_archived === false
  );
  const archivedData = data.filter((ele) => ele.task_archived === true);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const handleClick = (e, taskDate) => {
    e.preventDefault();
    if (taskDate === "today") {
      setIsToday(true);
      setIsTmr(false);
      setIsLater(false);
      setIsArchived(false);
    } else if (taskDate === "tmr") {
      setIsToday(false);
      setIsTmr(true);
      setIsLater(false);
      setIsArchived(false);
    } else if (taskDate === "later") {
      setIsToday(false);
      setIsTmr(false);
      setIsLater(true);
      setIsArchived(false);
    } else {
      setIsToday(false);
      setIsTmr(false);
      setIsLater(false);
      setIsArchived(true);
    }
  }
  function notify(title, body) {
    let options = {
      body: body,
      icon: Logo,
    };
    const notification = new Notification(title, options);
    notification.onclick = () => {
      window.open("https://localhost:3000"); // redirect to new page -- Challenge
    };

    setTimeout(notification.close.bind(), 3000);
  }
  const notificationCallTask = (title, body) => {
    if (!window.Notification) {
      console.log("Browser does not support notifications.");
    } else if (Notification.permission === "granted") {
      notify(title, body);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          notify(title, body);
        }
      });
    }
  };
  if (notifications.length > 0) {
    const currentNotification = [...notifications];
    setNotifications([]);
    console.log("Has notification");
    currentNotification.forEach((ele) => {
      let title = "Task Notification";
      let body = `Hi there, do not forget ${ele.task_subject} Please!`;
      notificationCallTask(title, body);
    });
  }

  return (
    <>
      <ul className="tabs">
        <li>
          <a href="#" onClick={(e) => handleClick(e, "today")}>
            Today
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => handleClick(e, "tmr")}>
            Tomorrow
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => handleClick(e, "later")}>
            Later
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => handleClick(e, "Archived")}>
            Archived
          </a>
        </li>
      </ul>
      {/* <p>{clockState}</p> */}
      {isToday && (
        <Pans data={todayData} submitComplete={props.submitComplete} />
      )}
      {isTmr && <Pans data={tmrData} submitComplete={props.submitComplete} />}
      {isLater && (
        <Pans data={laterData} submitComplete={props.submitComplete} />
      )}
      {taskIsArchived && (
        <Pans data={archivedData} submitComplete={props.submitComplete} />
      )}
    </>
  );
};

export default Tabs;
