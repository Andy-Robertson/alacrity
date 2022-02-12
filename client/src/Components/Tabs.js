import React, { useState, useEffect } from "react";
import Pans from "./Pans";
import Logo from "../Assets/img/logo.svg";

const Tabs = (props) => {
  const [data, setData] = useState(props.data);
  const todayDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const [isToday, setIsToday] = useState(true);
  const [isTmr, setIsTmr] = useState(false);
  const [isLater, setIsLater] = useState(false);
  const [taskIsArchived, setIsArchived] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("todayTab");

  const sortedData = [...data].sort((a, b) => a.id - b.id);

  const expiredTasks = sortedData.filter(
    (task) =>
      (new Date(task.by_date).getDate() < todayDate && !task.task_archived)
      && (new Date(task.by_date).getMonth() < currentMonth && !task.task_archived)
  );

  const todayData = sortedData.filter(
    (task) =>
      new Date(task.by_date).getDate() === todayDate && !task.task_archived
  );

  const tmrData = sortedData.filter(
    (task) =>
      new Date(task.by_date).getDate() === todayDate + 1 && !task.task_archived
  );

  const laterData = sortedData.filter(
    (task) =>
      new Date(task.by_date).getDate() !== todayDate + 1
      && new Date(task.by_date).getDate() !== todayDate
      && !task.task_archived
  );

  const archivedData = sortedData.filter((task) => task.task_archived === true);

  let intervalId = null;
  useEffect(() => {
    setData(props.data);
    if (intervalId) {
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
      setActiveTab("todayTab");
    } else if (taskDate === "tmr") {
      setIsToday(false);
      setIsTmr(true);
      setIsLater(false);
      setIsArchived(false);
      setActiveTab("tmrTab");
    } else if (taskDate === "later") {
      setIsToday(false);
      setIsTmr(false);
      setIsLater(true);
      setIsArchived(false);
      setActiveTab("laterTab");
    } else {
      setIsToday(false);
      setIsTmr(false);
      setIsLater(false);
      setIsArchived(true);
      setActiveTab("archiveTab");
    }
  };
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
      <ul className="tabs animate__animated animate__fadeInLeftBig">
        <li className={activeTab === "todayTab" ? "active" : ""}>
          <a href="#" onClick={(e) => handleClick(e, "today")}>
            Today
          </a>
        </li>
        <li className={activeTab === "tmrTab" ? "active" : ""}>
          <a href="#" onClick={(e) => handleClick(e, "tmr")}>
            Tomorrow
          </a>
        </li>
        <li className={activeTab === "laterTab" ? "active" : ""}>
          <a href="#" onClick={(e) => handleClick(e, "later")}>
            Later
          </a>
        </li>
        <li className={activeTab === "archiveTab" ? "active" : ""}>
          <a href="#" onClick={(e) => handleClick(e, "Archived")}>
            Archived
          </a>
        </li>
      </ul>
      {/* <p>{clockState}</p> */}
      {isToday && (
        <Pans
          data={todayData}
          expiredTasks={expiredTasks}
          submitComplete={props.submitComplete}
        />
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
