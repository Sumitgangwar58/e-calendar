import React, { useEffect, useState } from "react";
import "./AddMeetingForm.css";

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

  const handelChange = (value: string, type: string) => {
    setFormValue((prev) => ({ ...prev, [type]: value }));
  };

  const onSubmit = () => {
    onChange(formValue);
    onClose();
  };

  useEffect(() => {
    if (!value) return;
    setFormValue({ ...value });
  }, [value]);

  return (
    <>
      {open && (
        <div className="addMeetingForm">
          <table>
            <tbody>
              <tr>
                <td>Title:</td>
                <td colSpan={3}>
                  <input
                    type="text"
                    value={formValue.title}
                    onChange={(e) => handelChange(e.target.value, "title")}
                  />
                </td>
              </tr>
              <tr>
                <td>Start Date:</td>
                <td>
                  <input
                    type="date"
                    value={formValue.startDate}
                    onChange={(e) => handelChange(e.target.value, "startDate")}
                  />
                </td>
                <td>End Date:</td>
                <td>
                  <input
                    type="date"
                    value={formValue.endDate}
                    onChange={(e) => handelChange(e.target.value, "endDate")}
                  />
                </td>
              </tr>
              <tr>
                <td>Begins:</td>
                <td>
                  <input
                    type="time"
                    value={formValue.timeBegins}
                    onChange={(e) => handelChange(e.target.value, "timeBegins")}
                  />
                </td>
                <td>Ends:</td>
                <td>
                  <input
                    type="time"
                    value={formValue.timeEnds}
                    onChange={(e) => handelChange(e.target.value, "timeEnds")}
                  />
                </td>
              </tr>
              <tr>
                <td>People:</td>
                <td colSpan={3}>
                  <input
                    type="text"
                    value={formValue.people}
                    onChange={(e) => handelChange(e.target.value, "people")}
                  />
                </td>
              </tr>
              <tr>
                <td>Location:</td>
                <td colSpan={3}>
                  <input
                    type="text"
                    value={formValue.location}
                    onChange={(e) => handelChange(e.target.value, "location")}
                  />
                </td>
              </tr>
              <tr>
                <td>Description:</td>
                <td colSpan={3}>
                  <textarea
                    value={formValue.description}
                    onChange={(e) =>
                      handelChange(e.target.value, "description")
                    }
                  />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td colSpan={2}>
                  <button onClick={onSubmit}>Submit</button>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </>
  );
};

export default AddMeetingForm;
