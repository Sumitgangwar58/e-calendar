import React, { useEffect, useState } from "react";
import "./AddMeetingForm.css";
import Modal from "../../modal/Modal";

interface AddMeetingFormI {
  value?: ValueI;
  onChange: (newValue: ValueI) => void;
  open: boolean;
  onClose: () => void;
}

export interface ValueI {
  title: string;
  startDate: string;
  endDate: string;
  timeBegins: string;
  timeEnds: string;
  people: string;
  location: string;
  description: string;
}

const AddMeetingForm = ({
  value,
  onChange,
  onClose,
  open,
}: AddMeetingFormI) => {
  const [formValue, setFormValue] = useState<ValueI>({
    title: "",
    startDate: "",
    endDate: "",
    timeBegins: "",
    timeEnds: "",
    people: "",
    location: "",
    description: "",
  });
  const [requiredField, setRequiredField] = useState({
    title: false,
    timeBegins: false,
  });

  const handelChange = (value: string, type: string) => {
    if (type === "title" && value !== "")
      setRequiredField((prev) => ({ ...prev, title: false }));
    if (type === "timeBegins" && value !== "")
      setRequiredField((prev) => ({ ...prev, timeBegins: false }));
    setFormValue((prev) => ({ ...prev, [type]: value }));
  };

  const checkValidation = () => {
    let flag = false;
    if (formValue.title === "") {
      flag = true;
      setRequiredField((prev) => ({ ...prev, title: true }));
    } else setRequiredField((prev) => ({ ...prev, title: false }));
    if (formValue.timeBegins === "") {
      flag = true;
      setRequiredField((prev) => ({ ...prev, timeBegins: true }));
    } else setRequiredField((prev) => ({ ...prev, timeBegins: false }));
    return !flag;
  };

  const onSubmit = () => {
    if (checkValidation()) {
      if (formValue) onChange(formValue);
      onClose();
    }
  };

  useEffect(() => {
    if (!value) return;
    setFormValue({ ...value });
  }, [value]);

  const formMarkup = (
    <div className="form--add-Meeting">
      <div className="form-row">
        <div className="form-cell">Title:</div>
        <div className={`form-cell`}>
          <input
            className={` ${requiredField.title ? "required-input" : ""}`}
            type="text"
            value={formValue.title}
            onChange={(e) => handelChange(e.target.value, "title")}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-cell">Start Date:</div>
        <div className="form-cell">
          <input
            type="date"
            value={formValue.startDate}
            onChange={(e) => handelChange(e.target.value, "startDate")}
          />
        </div>
        <div className="form-cell">End Date:</div>
        <div className="form-cell">
          <input
            type="date"
            value={formValue.endDate}
            onChange={(e) => handelChange(e.target.value, "endDate")}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-cell">Begins:</div>
        <div className="form-cell">
          <input
            type="time"
            className={` ${requiredField.timeBegins ? "required-input" : ""}`}
            value={formValue.timeBegins}
            onChange={(e) => handelChange(e.target.value, "timeBegins")}
          />
        </div>
        <div className="form-cell">Ends:</div>
        <div className="form-cell">
          <input
            type="time"
            value={formValue.timeEnds}
            onChange={(e) => handelChange(e.target.value, "timeEnds")}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-cell">People:</div>
        <div className="form-cell">
          <input
            type="text"
            value={formValue.people}
            onChange={(e) => handelChange(e.target.value, "people")}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-cell">Location:</div>
        <div className="form-cell">
          <input
            type="text"
            value={formValue.location}
            onChange={(e) => handelChange(e.target.value, "location")}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-cell">Description:</div>
        <div className="form-cell">
          <textarea
            value={formValue.description}
            onChange={(e) => handelChange(e.target.value, "description")}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      content={
        <>
          {formMarkup}
          <button onClick={onSubmit}>Submit</button>
        </>
      }
    />
  );
};

export default AddMeetingForm;
