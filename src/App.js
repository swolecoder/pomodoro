import React, { useState, useRef } from "react";
import "./App.css";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [title, setTitle] = useState("Let the countdown begin!!!");

  let intervalRef = useRef(null);

  function startTimer() {
    setIsRunning(true);
    if (intervalRef.current !== null) return;
    setTitle("You are doing awesome!!");
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
  }

  //stop timer
  function stopTimer() {
    setIsRunning(false);
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("Keep it up");
  }

  function resetTimer() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimeLeft(25 * 60);
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(Math.floor(timeLeft - minutes * 60));

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
