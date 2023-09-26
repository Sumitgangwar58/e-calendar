import React, { useEffect, useState } from "react";
import "./AddMeetingForm.css";
import Modal from "../../modal/Modal";

interface AddMeetingFormI {
  value?: ValueI;
  onChange: (newValue: ValueI) => void;
  open: boolean;
  onClose: () => void;
  title?: string;
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
  title = "Add Appointment",
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

  const resetForm = () => [
    setFormValue({
      title: "",
      startDate: "",
      endDate: "",
      timeBegins: "",
      timeEnds: "",
      people: "",
      location: "",
      description: "",
    }),
  ];

  useEffect(() => {
    if (!value) return;
    setFormValue({ ...value });
  }, [value]);

  useEffect(() => {
    return () => {
      setRequiredField({
        title: false,
        timeBegins: false,
      });
      resetForm();
    };
  }, []);

  const newFormMarkup = (
    <div className="form--add-meeting">
      <label className="title" htmlFor={"title"}>
        Title
        {title === "Add Appointment" ? (
          <span className="required-star">*</span>
        ) : (
          ""
        )}
      </label>
      <input
        id="title"
        className={`${requiredField.title ? "required-input" : ""}`}
        type="text"
        value={formValue.title}
        onChange={(e) => handelChange(e.target.value, "title")}
      />

      <label htmlFor={"start-date"} className="start-date">
        Start Date :
      </label>
      <input
        type="date"
        id="start-date"
        value={formValue.startDate}
        onChange={(e) => handelChange(e.target.value, "startDate")}
      />

      <label htmlFor={"end-date"} className="end-date">
        End Date :
      </label>
      <input
        type="date"
        id="end-date"
        value={formValue.startDate}
        onChange={(e) => handelChange(e.target.value, "endDate")}
      />

      <label htmlFor="time-begins" className="time-begins">
        Begins
        {title === "Add Appointment" ? (
          <span className="required-star">*</span>
        ) : (
          ""
        )}{" "}
        :
      </label>
      <input
        type="time"
        id="time-begins"
        className={` ${requiredField.timeBegins ? "required-input" : ""}`}
        value={formValue.timeBegins}
        onChange={(e) => handelChange(e.target.value, "timeBegins")}
      />

      <label htmlFor="time-ends" className="time-ends">
        Ends :
      </label>
      <input
        type="time"
        id="time-ends"
        value={formValue.timeBegins}
        onChange={(e) => handelChange(e.target.value, "timeEnds")}
      />

      <label htmlFor="people" className="people">
        People :
      </label>
      <input
        type="text"
        id="people"
        value={formValue.people}
        onChange={(e) => handelChange(e.target.value, "people")}
      />

      <label htmlFor="location" className="location">
        Location :
      </label>
      <input
        id="location"
        type="text"
        value={formValue.location}
        onChange={(e) => handelChange(e.target.value, "location")}
      />

      <label htmlFor="description" className="description">
        Description :
      </label>
      <textarea
        id="description"
        value={formValue.description}
        onChange={(e) => handelChange(e.target.value, "description")}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );

  return (
    <Modal
      title={title}
      open={open}
      onClose={() => {
        setRequiredField({
          title: false,
          timeBegins: false,
        });
        resetForm();
        onClose();
      }}
      content={newFormMarkup}
    />
  );
};

export default AddMeetingForm;
