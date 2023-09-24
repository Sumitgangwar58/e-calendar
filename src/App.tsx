import React, { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import { ArrowLeft, ArrowRight } from "react-feather";
import Appointment from "./components/appointment/Appointment";

const monthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getPreviousMonth = (currMonth: number) => {
  return currMonth === 0 ? 11 : currMonth - 1;
};

const getNextMonth = (currMonth: number) => {
  return currMonth === 11 ? 0 : currMonth + 1;
};

function App() {
  const [currDate, setCurrDate] = useState<any>(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setCurrDate(selectedDate);
  }, [selectedDate]);

  const onNext = () => {
    setCurrDate((prev: any) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const onPrev = () => {
    setCurrDate((prev: any) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const onDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="App">
      <section id="calendar-section" className="section">
        <div className="calendar-header">
          <div className="logo">eCalendar</div>
          <div className="current-year">{currDate.getFullYear()}</div>
        </div>
        <div className="calendar-months">
          <span onClick={() => onPrev()}>
            {monthsOfYear[getPreviousMonth(currDate.getMonth())]}
          </span>
          <span>{monthsOfYear[currDate.getMonth()]}</span>
          <span onClick={() => onNext()}>
            {monthsOfYear[getNextMonth(currDate.getMonth())]}
          </span>
        </div>
        <div className="seperator"></div>
        <div className="calendar-body">
          <button onClick={onPrev} className="navigate-button">
            <ArrowLeft color="currentColor" size={50} />
          </button>
          <Calendar
            date={currDate}
            onClick={onDateClick}
            selectedDate={selectedDate}
            currDate={currDate}
          />
          <button onClick={onNext} className="navigate-button">
            <ArrowRight color="currentColor" size={50} />
          </button>
        </div>
      </section>
      <section id="eventList-section" className="section">
        <Appointment date={selectedDate} />
      </section>
    </div>
  );
}

export default App;
