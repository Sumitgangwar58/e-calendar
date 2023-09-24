import React, { useContext, useEffect, useState } from "react";
import "./Appointment.css";
import AddMeetingForm, { ValueI } from "./AddMeetingForm/AddMeetingForm";
import { dataContext } from "../../api/DataContext";
import MeetingCard from "./MeetingCard/MeetingCard";

interface AppointmentI {
  date: Date;
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const Appointment = ({ date }: AppointmentI) => {
  const [formOpen, setFormOpen] = useState(false);
  const [formValue, setFormValue] = useState<ValueI>();

  const { data, dispatch } = useContext(dataContext);

  const handelFormSubmit = (newValue: ValueI) => {
    dispatch({
      type: "Add",
      payload: { data: newValue, date: date },
    });
  };

  return (
    <div className="appointment-container">
      <div className="user-setup">Sign In</div>
      <div className="date-view">
        <div className="appointment-day">{daysOfWeek[date.getDay()]}</div>
        <div className="appointment-monthDetails">
          <span className="appointment-month">
            {monthsOfYear[date.getMonth()]}
          </span>
          <span className="appointment-dateDay">
            {date.getDate() < 10 ? 0 + `${date.getDate()}` : date.getDate()}
          </span>
        </div>
      </div>
      <div className="appointment-list">
        {data && data[formatDate(date)]
          ? data[formatDate(date)].map((item) => <MeetingCard data={item} />)
          : "Sorry no Meetings...."}
      </div>
      <div
        className="add-meeting-button"
        onClick={() => setFormOpen((prev) => !prev)}
      >
        Add
      </div>

      <AddMeetingForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        value={formValue}
        onChange={handelFormSubmit}
      />
    </div>
  );
};

export default Appointment;
