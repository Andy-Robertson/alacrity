import React, { useState, useEffect, useRef, useContext } from "react";
import PomodoroAnimation from "./PomodoroAnimation";
import Button from "./button";
import { GrPowerReset, GrPauseFill, GrPlayFill } from "react-icons/gr";
import workComplete from "../../Assets/audio/success-sound-effect.mp3";
import { GlobalContext } from "../../Contexts/GlobalContext";
import Logo from "../../Assets/img/logo.svg";

const Pomodoro = () => {
  const {
    seconds,
    setSeconds,
    minutes,
    setMinutes,
    enableNotificationSound,
    enableNotifications,
  } = useContext(GlobalContext);

  const workCompleteSound = new Audio(workComplete);

  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [pomodoroSessionEnded, setPomodoroSessionEnded] = useState(false);
  const interval = useRef(null);

  const notify = (title, body) => {
    let options = {
      body: body,
      icon: Logo,
    };
    const notification = new Notification(title, options);
    notification.onclick = () => {
      window.open("https://localhost:3000");
    };

    setTimeout(notification.close.bind(notification), 3000);
  };

  const notificationCall = (title, body) => {
    if (!window.Notification) {
      console.log("Browser does not support notifications.");
    } else {
      if (Notification.permission === "granted") {
        notify(title, body);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            notify(title, body);
          }
        });
      }
    }
  };

  useEffect(() => {
    let title = "Pomodoro Notification";
    let body = "Well Done The Time is Up";

    if (pomodoroSessionEnded) {
      enableNotificationSound && workCompleteSound.play();
      enableNotifications && notificationCall(title, body);
    } else {
      return null;
    }
  }, [pomodoroSessionEnded]);

  useEffect(() => {
    setTotalTimeInSeconds(minutes * 60 + seconds);
    setTimeLeftInSeconds(totalTimeInSeconds);
  }, [minutes, seconds, totalTimeInSeconds]);

  const handleStartTimer = () => {
    if (interval.current !== null) {
      return;
    }

    setTimerActive(true);
    interval.current = setInterval(() => {
      setTimeLeftInSeconds((timeLeftInSeconds) => {
        if (timeLeftInSeconds >= 1) {
          setPomodoroSessionEnded(false);
          return timeLeftInSeconds - 1;
        } else {
          setPomodoroSessionEnded(true);
          return 0;
        }
      });
    }, 1000);
  };

  const handleStopTimer = () => {
    if (interval.current === null) {
      return;
    }

    setTimerActive(false);
    clearInterval(interval.current);

    interval.current = null;
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    clearInterval(interval.current);
    interval.current = null;
    setTimeLeftInSeconds(totalTimeInSeconds);
  };

  const handleTimeSelect = (e) => {
    if (e.target.value === "Focus") {
      setMinutes(25);
      setSeconds(0);
    } else if (e.target.value === "Rest") {
      setMinutes(5);
      setSeconds(0);
    } else {
      setMinutes(30);
      setSeconds(0);
    }
  };

  const INACTIVE = "pomodoro-btn-interaction pomodoro-time-btn";
  const ACTIVE = "pomodoro-btn-interaction pomodoro-time-btn pomodoro-time-btn-active";

  return (
    <section className="pomodoro-wrapper animate__animated animate__fadeInRightBig">
      <span className="pomodoro-time-selector-wrapper">
        <Button
          type={minutes === 25 ? ACTIVE : INACTIVE}
          handleClick={handleTimeSelect}
          children={"Focus"}
          value={"Focus"}
        />

        <Button
          type={minutes === 5 ? ACTIVE : INACTIVE}
          handleClick={handleTimeSelect}
          children={"Rest"}
          value={"Rest"}
        />

        <Button
          type={minutes === 30 ? ACTIVE : INACTIVE}
          handleClick={handleTimeSelect}
          children={"Break"}
          value={"Break"}
        />
      </span>

      <PomodoroAnimation
        timeLeftInSeconds={timeLeftInSeconds}
        totalTimeInSeconds={totalTimeInSeconds}
      />

      <span className="pomodoro-start-reset-wrapper">
        {!timerActive && (
          <Button
            type={"pomodoro-startStop-btn pomodoro-btn-interaction"}
            handleClick={handleStartTimer}
            children={<GrPlayFill />}
          />
        )}

        {timerActive && timeLeftInSeconds > 0 && (
          <Button
            type={"pomodoro-startStop-btn pomodoro-btn-interaction"}
            handleClick={handleStopTimer}
            children={<GrPauseFill />}
          />
        )}

        {!timeLeftInSeconds && (
          <Button
            type={"pomodoro-large-reset-btn pomodoro-btn-interaction-reset"}
            handleClick={handleResetTimer}
            children={<GrPowerReset />}
          />
        )}

        {timeLeftInSeconds > 0 && (
          <Button
            type={"pomodoro-small-reset-btn pomodoro-btn-interaction-reset"}
            handleClick={handleResetTimer}
            children={<GrPowerReset />}
          />
        )}
      </span>
    </section>
  );
};

export default Pomodoro;
