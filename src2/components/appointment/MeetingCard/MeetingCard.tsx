import React, { useContext, useState } from "react";
import AddMeetingForm, { ValueI } from "../AddMeetingForm/AddMeetingForm";
import { Delete, Edit, Edit2, Eye, Trash, Trash2 } from "react-feather";
import "./MeetingCard.css";
import { dataContext } from "../../../api/DataContext";
import Modal from "../../modal/Modal";

interface MeetingCardI {
  data: ValueI;
  date: Date;
  index: number;
}

const MeetingCard = ({ data, date, index }: MeetingCardI) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [openView, setOpenView] = useState(false);

  const { dispatch } = useContext(dataContext);

  const handelChange = (newValue: ValueI) => {
    dispatch({
      type: "Edit",
      payload: {
        data: newValue,
        date: date,
        index: index,
      },
    });
  };

  const deleteAppointment = () => {
    dispatch({
      type: "Delete",
      payload: {
        date: date,
        index: index,
      },
    });
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
            className="view-button"
            onClick={() => setOpenView((prev) => !prev)}
          >
            <Eye />
          </button>
          <button
            className="edit-button"
            onClick={() => setModalOpen((prev) => !prev)}
          >
            <Edit2 />
          </button>
          <button className="delete-button" onClick={deleteAppointment}>
            <Trash2 />
          </button>
        </div>
      </div>
      {/* <div className="meeting-card-body">
        <table>
          {Object.entries(data).map((item) => (
            <tr>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
            </tr>
          ))}
        </table>
      </div> */}
      <AddMeetingForm
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        value={data}
        onChange={handelChange}
      />

      <Modal
        open={openView}
        onClose={() => setOpenView(false)}
        content={
          <table>
            {Object.entries(data).map((item) => (
              <tr>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>
            ))}
          </table>
        }
      />
    </div>
  );
};

export default MeetingCard;
