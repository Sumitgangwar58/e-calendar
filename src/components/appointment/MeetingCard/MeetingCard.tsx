import React, { useContext, useState } from "react";
import AddMeetingForm, { ValueI } from "../AddMeetingForm/AddMeetingForm";
import { Edit2, Eye, Trash2 } from "react-feather";
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
  const [deleteModal, setDeleteModal] = useState(false);

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

  const openDeleteModal = () => {
    setDeleteModal(true);
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

  const viewTable = (
    <table className="view-table">
      {Object.entries(data).map((item) => (
        <tr>
          <td>{item[0]}</td>
          <td>{item[1]}</td>
        </tr>
      ))}
    </table>
  );

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
          <button className="delete-button" onClick={openDeleteModal}>
            <Trash2 />
          </button>
        </div>
      </div>
      <AddMeetingForm
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        title={"Edit Appointment"}
        value={data}
        onChange={handelChange}
      />

      <Modal
        open={openView}
        title="View Details"
        onClose={() => setOpenView(false)}
        content={viewTable}
      />

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Appointment"
        content={
          <div className="delete-modal-body">
            <p>Are You Sure Want to Delete This </p>
            {viewTable}
            <div className="action-button">
              <button
                className="delete-close-button"
                onClick={() => setDeleteModal(false)}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setDeleteModal(false);
                  deleteAppointment();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default MeetingCard;
