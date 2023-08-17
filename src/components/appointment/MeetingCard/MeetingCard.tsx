import React, { useState } from "react";
import AddMeetingForm, { ValueI } from "../AddMeetingForm/AddMeetingForm";
import { Delete, Edit, Edit2, Trash, Trash2 } from "react-feather";
import "./MeetingCard.css";

interface MeetingCardI {
  data: ValueI;
}

const MeetingCard = ({ data }: MeetingCardI) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handelChange = (newValue: ValueI) => {
    console.log(newValue);
  };

  return (
    <div className="meeting-card">
      <div className="meeting-card-header">
        <div className="meeting-details">
          <div className="meeting-card__start-time">{data.timeBegins}</div>
          <div className="meeting-card__title">{data.title}</div>
        </div>
        <div className="meeting-card-action-button">
          <button
            className="edit-button"
            onClick={() => setModalOpen((prev) => !prev)}
          >
            <Edit2 />
          </button>
          <button className="delete-button">
            <Trash2 />
          </button>
        </div>
      </div>
      <div className="meeting-card-body">
        <table>
          {Object.entries(data).map((item) => (
            <tr>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
            </tr>
          ))}
        </table>
      </div>
      <AddMeetingForm
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        value={data}
        onChange={handelChange}
      />
    </div>
  );
};

export default MeetingCard;
