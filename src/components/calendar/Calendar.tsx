import React, { useContext } from "react";
import "./Calendar.css";
import { dataContext } from "../../api/DataContext";

interface CalendarI {
  date: Date;
  onClick: (date: Date) => void;
  selectedDate: Date;
  currDate: any;
}

const formatDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const firstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const isSameYear = (a: Date, b: Date) => {
  return a.getFullYear() === b.getFullYear();
};

const isSameMonth = (a: Date, b: Date) => {
  return isSameYear(a, b) && a.getMonth() === b.getMonth();
};

const isSameDay = (a: Date, b: Date) => {
  return isSameMonth(a, b) && a.getDate() === b.getDate();
};

type PrevOrAfter = "prevMonth" | "afterMonth";

const getDates = (
  month: number,
  year: number,
  numOfDays: number,
  prevOrAfter: PrevOrAfter
): Date[] => {
  const dates: Date[] = [];
  const date = new Date(year, month, 1);

  if (prevOrAfter === "prevMonth") {
    date.setDate(0); // Move to the last day of the previous month
  } else if (prevOrAfter === "afterMonth") {
    date.setMonth(month + 1, 1); // Move to the first day of the next month
  } else {
    throw new Error(
      'Invalid prevOrAfter parameter. It should be "prevMonth" or "afterMonth".'
    );
  }

  for (let i = 0; i < numOfDays; i++) {
    dates.push(new Date(date));
    if (prevOrAfter === "prevMonth")
      date.setDate(date.getDate() - 1); // Move to the previous day
    else date.setDate(date.getDate() + 1);
  }

  return dates.reverse(); // Reverse the array to get the dates in ascending order
};

const setDayInDate = (date: Date, day: number) => {
  let t = new Date(date);
  t.setDate(day);
  t.setHours(0, 0, 0);
  return t;
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ currDate, date, onClick, selectedDate }: CalendarI) => {
  const { data } = useContext(dataContext);

  const getCalendarDates = () => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(date.getMonth(), date.getFullYear());
    const firstDayInCurrentMonth = firstDayOfMonth(date);
    const prevMonthCellCount = firstDayInCurrentMonth;
    const prevDates = getDates(
      date.getMonth(),
      date.getFullYear(),
      prevMonthCellCount,
      "prevMonth"
    );

    for (let i = 0; i < prevMonthCellCount; i++) {
      const currDate = prevDates[i];
      days.push(
        <td
          key={`empty-${i}`}
          title={formatDate(currDate)}
          className={`other-month-date ${
            data && data[formatDate(currDate)] ? "date-has-meeting" : ""
          }`}
          onClick={() => onClick(currDate)}
        >
          <div>{currDate.getDate()}</div>
        </td>
      );
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const currDate = setDayInDate(date, day);
      days.push(
        <td
          key={day}
          onClick={() => onClick(currDate)}
          title={formatDate(currDate)}
          className={`${
            isSameDay(currDate, selectedDate) ? "current-selected-date" : null
          } current-month-date ${
            data && data[formatDate(currDate)] ? "date-has-meeting" : ""
          }`}
        >
          <div>{day}</div>
        </td>
      );
    }

    const nextMonthCellCount = 42 - (daysInCurrentMonth + prevMonthCellCount);
    const afterDates = getDates(
      date.getMonth(),
      date.getFullYear(),
      nextMonthCellCount,
      "afterMonth"
    ).reverse();
    for (let i = 0; i < nextMonthCellCount; i++) {
      const currDate = afterDates[i];
      days.push(
        <td
          key={`empty-${i}`}
          className={`other-month-date${
            data && data[formatDate(currDate)] ? "date-has-meeting" : ""
          }`}
          onClick={() => onClick(currDate)}
          title={formatDate(currDate)}
        >
          <div>{currDate.getDate()}</div>
        </td>
      );
    }

    // Group days into rows of seven
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(<tr key={`row-${i / 7}`}>{days.slice(i, i + 7)}</tr>);
    }

    return rows;
  };

  return (
    <table className="calendar-table">
      <thead>
        <tr>
          {daysOfWeek.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>{getCalendarDates()}</tbody>
    </table>
  );
};

export default Calendar;
