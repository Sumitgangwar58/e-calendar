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

const monthColors: { [key: string]: string } = {
  Jan: "linear-gradient(180deg, #7a7a7a, #ffffff , var(--c3))", // January (Winter)
  Feb: "linear-gradient(180deg, #ff66b2, #ffffff , var(--c3))", // February (Valentine's Day)
  Mar: "linear-gradient(180deg, #66ffaa, #ffffff , var(--c3))", // March (St. Patrick's Day)
  Apr: "linear-gradient(180deg, #ffb266, #ffffff , var(--c3))", // April (Spring)
  May: "linear-gradient(180deg, #fffc00, #ffffff , var(--c3))", // May (Sunshine)
  Jun: "linear-gradient(180deg, #ff4d4d, #ffffff , var(--c3))", // June (Summer)
  Jul: "linear-gradient(180deg, #ffad33, #ffffff , var(--c3))", // July (Beach)
  Aug: "linear-gradient(180deg, #33cc33, #ffffff , var(--c3))", // August (Nature)
  Sep: "linear-gradient(180deg, #6666ff, #ffffff , var(--c3))", // September (Back to School)
  Oct: "linear-gradient(180deg, #ff8533, #ffffff , var(--c3))", // October (Halloween)
  Nov: "linear-gradient(180deg, #b266ff, #ffffff , var(--c3))", // November (Autumn)
  Dec: "linear-gradient(180deg, #80ff80, #ffffff , var(--c3))", // December (Christmas)
};
const getPreviousMonth = (currMonth: number) => {
  return currMonth === 0 ? 11 : currMonth - 1;
};

const getNextMonth = (currMonth: number) => {
  return currMonth === 11 ? 0 : currMonth + 1;
};

function App() {
  const [currDate, setCurrDate] = useState<Date>(new Date());
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

  const [selectVal, setSelectVal] = useState(currDate.getFullYear());

  console.log(currDate, "-------------------");

  return (
    <div className="App">
      <section id="calendar-section" className="section">
        <div className="calendar-header">
          <div className="logo">eCalendar</div>
          <div className="current-year">
            {
              <select
                value={`${currDate.getFullYear()}`}
                onChange={(e) =>
                  setCurrDate((prev) => {
                    console.log(
                      Number(e.target.value),
                      prev.getMonth(),
                      prev.getDate()
                    );
                    return new Date(
                      Number(e.target.value),
                      prev.getMonth(),
                      prev.getDate()
                    );
                  })
                }
              >
                {Array(200)
                  .fill(0)
                  .map((_, index) => (
                    <option value={`${1900 + index}`}>{1900 + index}</option>
                  ))}
              </select>
            }
          </div>
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
      <section
        id="eventList-section"
        className="section"
        style={{
          background: monthColors[monthsOfYear[selectedDate.getMonth()]],
        }}
      >
        <Appointment date={selectedDate} />
      </section>
    </div>
  );
}

export default App;
