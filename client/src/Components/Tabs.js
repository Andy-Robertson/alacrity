import React, { useState } from "react";
import Pans from "./Pans";

const Tabs = (props) => {
    // console.log(props.data)
    const date = new Date();
    const dateToday = date.getDate();
    const todayData = [];
    const tomorwData = [];
    const laterData = [];

    // Month/day/year
    // props.data.forEach((task) => {
    //         task.date = new Date(task.date)
    //     })
    // console.log(props.data);
    // console.log(dateToday);
    props.data.map((task) => {
        let dateToday2 = new Date(task.by_date).getDate();
        // console.log('date' + dateToday2)
        if (dateToday2 === dateToday) {
            todayData.push(task);
        } else if (dateToday2 === dateToday + 1) {
            tomorwData.push(task);
        } else {
            laterData.push(task);
        }
    });
    // console.log( todayData);
    const [activeList, setActiveList] = useState(todayData);
    // const [activeTab, setActiveTab] = useState(dateToday);

    function handleClick(e, newAtiveTab, newList) {
        e.preventDefault();
        // setActiveTab(newAtiveTab);
        setActiveList(newList);
    }
    // console.log(activeTab);
    return (
        <>
            <ul className="tabs">
                <li><a href="#" onClick={(e) => handleClick(e, dateToday, todayData)}>Today</a> </li>
                <li><a href="#" onClick={(e) => handleClick(e, dateToday + 1, tomorwData)}>Tomorow</a></li>
                <li><a href="#" onClick={(e) => handleClick(e, dateToday + 2, laterData)}>Later</a></li>
            </ul>
            <Pans data={activeList} />
        </>
    );
};


export default Tabs;