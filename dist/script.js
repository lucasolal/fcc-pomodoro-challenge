const { useState, useEffect } = React;

function Clock() {
  [breakLength, setBreakLength] = useState(5);
  [sessionLength, setSessionLength] = useState(25);
  [isRunning, toggleRunning] = useState(false);
  [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  [currentlyRunning, setCurrentlyRunning] = useState("Session");
  [int, setInt] = useState(undefined);
  [clockLabel, setClockLabel] = useState("Session");

  const incrementBreakCounter = amount => oldState => {
    const newState = oldState + amount;
    if (!isRunning && newState > 0 && newState <= 60) {
      return newState;
    } else return oldState;
  };

  const incrementSessionCounter = amount => oldState => {
    const newState = oldState + amount;
    if (!isRunning && newState > 0 && newState <= 60) {
      setTimeLeft(newState * 60);
      return newState;
    } else return oldState;
  };

  const startTimer = () => {
    setInt(oldState => {
      clearInterval(int);

      return setInterval(() => {
        if (!isRunning) clearInterval(int);
        setTimeLeft(oldState => oldState - 1);
        if (timeLeft == 0) document.getElementById("beep").play();
        if (timeLeft < 0) {
          if (currentlyRunning == "Session") {
            setCurrentlyRunning("Break");
            setTimeLeft(breakLength * 60);
            startTimer();
          } else {
            setCurrentlyRunning("Session");
            setTimeLeft(sessionLength * 60);
            startTimer();
          }
        }
      }, 1000);
    });
  };

  const resetClock = () => {
    clearInterval(int);
    toggleRunning(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setCurrentlyRunning("Session");
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  };

  const handleStartStop = () => {
    toggleRunning(oldState => {
      if (oldState == false) startTimer();else
      clearInterval(int);
      return !oldState;
    });
  };

  const timeString = seconds => {
    let arr = [`${Math.floor(seconds / 60)}`, `${seconds % 60}`];
    arr = arr.map(str => str.length == 1 ? `0${str}` : str);
    return arr.join(":");
  };

  const start_stopText = () => isRunning ? "STOP" : "START";

  return /*#__PURE__*/(
    React.createElement("div", { id: "clock-box" }, /*#__PURE__*/

    React.createElement("div", { id: "length-control" }, /*#__PURE__*/
    React.createElement("div", { id: "break-label" }, /*#__PURE__*/
    React.createElement("h1", null, "Break length"), /*#__PURE__*/
    React.createElement("button", {
      class: "setting-btn",
      id: "break-decrement5",
      onClick: () => setBreakLength(incrementBreakCounter(-5)) }, "<< 5"), /*#__PURE__*/



    React.createElement("button", {
      class: "setting-btn",
      id: "break-decrement",
      onClick: () => setBreakLength(incrementBreakCounter(-1)) }, "< 1"), /*#__PURE__*/



    React.createElement("span", { id: "break-length" }, breakLength), /*#__PURE__*/
    React.createElement("button", {
      class: "setting-btn",
      id: "break-increment",
      onClick: () => setBreakLength(incrementBreakCounter(1)) }, "1 >"), /*#__PURE__*/



    React.createElement("button", {
      class: "setting-btn",
      id: "break-decrement5",
      onClick: () => setBreakLength(incrementBreakCounter(5)) }, "5 >>")), /*#__PURE__*/





    React.createElement("div", { id: "session-label" }, /*#__PURE__*/
    React.createElement("h1", null, "Session length"), /*#__PURE__*/
    React.createElement("button", {
      class: "setting-btn",
      id: "session-decrement5",
      onClick: () => setSessionLength(incrementSessionCounter(-5)) }, "<< 5"), /*#__PURE__*/



    React.createElement("button", {
      class: "setting-btn",
      id: "session-decrement",
      onClick: () => setSessionLength(incrementSessionCounter(-1)) }, "< 1"), /*#__PURE__*/



    React.createElement("span", { id: "session-length" }, sessionLength), /*#__PURE__*/
    React.createElement("button", {
      class: "setting-btn",
      id: "session-increment",
      onClick: () => setSessionLength(incrementSessionCounter(1)) }, "1 >"), /*#__PURE__*/



    React.createElement("button", {
      class: "setting-btn",
      id: "session-increment5",
      onClick: () => setSessionLength(incrementSessionCounter(5)) }, "5 >>"))), /*#__PURE__*/






    React.createElement("div", { id: "timer" }, /*#__PURE__*/
    React.createElement("h1", { id: "timer-label" }, currentlyRunning), /*#__PURE__*/
    React.createElement("div", { id: "time-left" }, timeString(timeLeft)), /*#__PURE__*/
    React.createElement("button", { id: "start_stop", onClick: handleStartStop },
    start_stopText()), /*#__PURE__*/

    React.createElement("button", { id: "reset", onClick: resetClock }, "Reset"), /*#__PURE__*/


    React.createElement("audio", {
      id: "beep",
      src: "https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Electro%20and%20Synthetic/192[kb]watch_alarm.aif.mp3" }))));




}

ReactDOM.render( /*#__PURE__*/React.createElement(Clock, null), document.getElementById("root"));