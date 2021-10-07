import React from 'react';
import './App.css';
import './assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Logo from './assets/images/logo.png';
import Display from './components/Display';

const {useState, useEffect, useRef} = React;

function App() {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeDisplay, setTimeDisplay] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);


  const timerClock = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  const decrementBreak = (e) => {
    e.preventDefault();
    if(breakLength >= 2 && breakLength <= 60) {
      setBreakLength((prev) => prev - 1);
    }
  }

  const incrementBreak = (e) => {
    e.preventDefault();
    if(breakLength >= 1 && breakLength < 60) {
      setBreakLength((prev) => prev + 1);
    }
  }

  const decrementSession = (e) => {
    e.preventDefault();
    const amount = 60;
    if(sessionLength >= 2 && sessionLength <= 60) {
      setSessionLength((prev) => prev - 1);
      setTimeDisplay(prev => prev - amount);
    }
  }

  const incrementSession = (e) => {
    e.preventDefault();
    const amount2 = 60;
    if(sessionLength >= 1 && sessionLength < 60) {
      setSessionLength((prev) => prev + 1);
      setTimeDisplay(prev => prev + amount2);
    }
  }

  const playTime = (e) => {
    e.preventDefault();
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVar = onBreak;
    if(!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if(date > nextDate) {
          setTimeDisplay(prev => {
            return prev - 1;
          })
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem('interval-id', interval);
    }
    if(timerOn){
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  }

  const onReset = (e) => {
    e.preventDefault();
    setTimeDisplay(25 * 60);
    setBreakLength(5);
    setSessionLength(25);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header">
          <img src={Logo} alt="Logo-personal" className="img-fluid" width="70"></img>
        </div>
        <section className="watch">
          <Display 
            meddle={breakLength}
            session={sessionLength}
            reset={onReset}
            timeDisplay={timeDisplay}
            time={timerClock}
            dBreak={decrementBreak}
            iBreak={incrementBreak}
            dSession={decrementSession}
            iSession={incrementSession}
            play={playTime}
            />
        </section>
        <div className="footer row">
          <h1 className="col-6 text-start ps-5">25 + 5 Clock</h1>
          <p className="col-6 text-end pe-5">Designed and coded by Ronald Labrador - &copy; 2021</p>
        </div>
      </header>
    </div>
  );
}

export default App;
