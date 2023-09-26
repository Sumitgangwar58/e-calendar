import React, { useContext, useEffect, useState } from "react";
import "./Appointment.css";
import AddMeetingForm, { ValueI } from "./AddMeetingForm/AddMeetingForm";
import { dataContext } from "../../api/DataContext";
import MeetingCard from "./MeetingCard/MeetingCard";
import Modal from "../modal/Modal";

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
  const [addUserForm, setAddUserForm] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formValue, setFormValue] = useState<ValueI>();
  const { data, dispatch, user, addUser } = useContext(dataContext);

  const [userName, setUserName] = useState("");

  const handelFormSubmit = (newValue: ValueI) => {
    dispatch({
      type: "Add",
      payload: { data: newValue, date: date },
    });
  };

  return (
    <div className="appointment-container">
      <div className="user-setup">
        {user ? (
          <span onClick={() => addUser(null)}>{user}</span>
        ) : (
          <button onClick={() => setAddUserForm((prev) => !prev)}>
            Sign In
          </button>
        )}
      </div>
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
          ? data[formatDate(date)].map((item, index) => (
              <MeetingCard index={index} date={date} data={item} />
            ))
          : "Sorry no Meetings...."}
      </div>
      <button
        className="add-meeting-button"
        onClick={() => setFormOpen((prev) => !prev)}
      >
        Add Appointment
      </button>

      <AddMeetingForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        value={formValue}
        onChange={handelFormSubmit}
      />

      <Modal
        content={
          <div className="add-user-form">
            <label>
              Enter Your Name :{" "}
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
              />
              <p>
                This will allow to use your local browser storege to store your
                data
              </p>
            </label>
            <button
              onClick={() => {
                if (!userName) return;
                addUser(userName);
                setAddUserForm(false);
              }}
            >
              Submit
            </button>
          </div>
        }
        open={addUserForm}
        onClose={() => setAddUserForm(false)}
      />
    </div>
  );
};

export default Appointment;
