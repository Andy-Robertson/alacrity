import React, { useState, useEffect } from "react";
import Pans from "./Pans";

const Tabs = (props) => {
  console.log(props.data);
  const [data, setData] = useState(props.data);
  const todayDate = new Date().getDate();
  const [isToday, setIsToday] = useState(true);
  const [isTmr, setIsTmr] = useState(false);
  const [isLater, setIsLater] = useState(false);
  const [taskIsArchived, setTaskIsArchived] = useState(false);

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
  //   console.log(taskIsArchived);
  // console.log(data);
  const archivedData = data.filter((ele) => {
    // console.log(ele.task_archived);
    return ele.task_archived === true;
  });
  // console.log(`test:${archivedData}`);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const handleClick = (e, taskDate) => {
    e.preventDefault();
    if (taskDate === "today") {
      setIsToday(true);
      setIsTmr(false);
      setIsLater(false);
      setTaskIsArchived(false);
    } else if (taskDate === "tmr") {
      setIsToday(false);
      setIsTmr(true);
      setIsLater(false);
      setTaskIsArchived(false);
    } else if (taskDate === "later") {
      setIsToday(false);
      setIsTmr(false);
      setIsLater(true);
      setTaskIsArchived(false);
    } else {
      setIsToday(false);
      setIsTmr(false);
      setIsLater(false);
      setTaskIsArchived(true);
    }
  };

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
