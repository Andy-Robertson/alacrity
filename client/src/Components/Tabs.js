import React, { useState, useEffect } from "react";
import Pans from "./Pans";

const Tabs = (props) => {
  const [data, setData] = useState(props.data);
  const todayDate = new Date().getDate();
  const [isToday, setIsToday] = useState(true);
  const [isTmr, setIsTmr] = useState(false);
  const [isLater, setIsLater] = useState(false);

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
