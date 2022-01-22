import React, { useState, useEffect } from "react";
import Pans from "./Pans";

const Tabs = (props) => {
  // console.log(props.data)
  const date = new Date();
  const dateToday = date.getDate();
  const [todayData, setTodayData] = useState([]);
  const [tomorwData, setTomorwData] = useState([]);
  const [laterData, setLaterData] = useState([]);

  const [activeList, setActiveList] = useState(todayData);

  useEffect(() => {
    const _todayData = [];
    const _tomorwData = [];
    const _laterData = [];
    props.data.map((task) => {
      let dateToday2 = new Date(task.by_date).getDate();
      // console.log('date' + dateToday2)
      if (dateToday2 === dateToday) {
        _todayData.push(task);
      } else if (dateToday2 === dateToday + 1) {
        _tomorwData.push(task);
      } else {
        _laterData.push(task);
      }
    });
    console.log(todayData);
    setTodayData(_todayData);
    setTomorwData(_tomorwData);
    setLaterData(_laterData);
    setActiveList(todayData);
  }, [props.data, dateToday, todayData]);
  // const [activeTab, setActiveTab] = useState(dateToday);
  console.log(todayData, activeList);
  function handleClick(e, newAtiveTab, newList) {
    e.preventDefault();
    // setActiveTab(newAtiveTab);
    setActiveList(newList);
  }
  // console.log(activeTab);
  return (
    <>
      <ul className="tabs">
        <li>
          <a href="#" onClick={(e) => handleClick(e, dateToday, todayData)}>
            Today
          </a>{" "}
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => handleClick(e, dateToday + 1, tomorwData)}
          >
            Tomorow
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => handleClick(e, dateToday + 2, laterData)}>
            Later
          </a>
        </li>
      </ul>
      <Pans data={activeList} submitComplete={props.submitComplete} />
    </>
  );
};

export default Tabs;
