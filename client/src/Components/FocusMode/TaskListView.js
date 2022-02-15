import React, { useEffect, useState } from "react";
import Tabs from "../Tabs";

const TaskListView = ({ user, taskData, submitComplete }) => {
  const todayDate = new Date().getDate();
  const todayData = taskData.filter(
    (tasks) => new Date(tasks.by_date).getDate() === todayDate && !tasks.task_archived
  );
  const [quote, setQoute] = useState(null);

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
        console.log(data);
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
        <div className="bk-image"></div>
        <span className="bk-text">
        {/* <blockquote className="blockquote ">
                <p> "The only difference between success and failure is the ability to
              take action."</p>
                  <footer className="blockquote-footer">
                    <cite title="Source Title">Alexander Graham Bell</cite>
                  </footer>
              </blockquote> */}
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
