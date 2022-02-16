import React, { useEffect, useState } from "react";
import Tabs from "../Tabs";
import Coffee from "../../Assets/img/quotes_img/coffee.gif";
import Lying from "../../Assets/img/quotes_img/lying.png";
import Sitting from "../../Assets/img/quotes_img/sitting-reading.png";
import Zombieing from "../../Assets/img/quotes_img/zombieing.svg";
import Swinging from "../../Assets/img/quotes_img/swinging.svg";
import Meditating from "../../Assets/img/quotes_img/meditating.svg";
import Loving from "../../Assets/img/quotes_img/loving.svg";

const TaskListView = ({ user, taskData, submitComplete }) => {
  const todayDate = new Date().getDate();
  const todayData = taskData.filter(
    (tasks) => new Date(tasks.by_date).getDate() === todayDate && !tasks.task_archived
  );
  const [quote, setQoute] = useState(null);
  const imgArr = [Coffee, Lying, Sitting, Zombieing, Swinging, Meditating, Loving];
  function pickFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  // Variables
  const bkImg = pickFromArray(imgArr);
  console.log(bkImg);

  useEffect(() => {
    // declare the data fetching function
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const { statusCode, statusMessage, ...data } = await response.json();
        if (!response.ok) {
          throw new Error(`${statusCode} ${statusMessage}`);
        }
        setQoute(data);
        // console.log(data);
      } catch (error) {
        // If the API request failed, log the error to console and update state
        // so that the error will be reflected in the UI.
        console.error(error);
        setQoute({ content: "Opps... Something went wrong" });
      }
    };
    // call the function
    fetchQuote().catch(console.error); // make sure to catch any error
  }, []);
  return (
    <section className="wrapper">
      <div className="wrapper__text animate__animated animate__fadeInLeftBig">
        <h3>Welcome back {user.displayName}!</h3>
        <h2>You've got {todayData.length} tasks today</h2>
      </div>
      <div className="wrapper__cards scrollable-element">
        {taskData.length > 0 && (
          <Tabs data={taskData} submitComplete={submitComplete} />
        )}
      </div>
      <div className="wrapper__bk animate__animated animate__fadeIn animate__delay-1s">
        <div className="bk-image" style={{
          backgroundImage: `url(${bkImg})`,
        }}></div>
        <span className="bk-text">
            {!quote ? null :<blockquote className="blockquote mb-0">
                <p>"{quote.content}"</p>
                {quote.author && (
                  <footer className="blockquote-footer">
                    <cite title="Source Title">{quote.author}</cite>
                  </footer>
                )}
              </blockquote>
            }
          </span>
      </div>
    </section>
  );
};

export default TaskListView;
