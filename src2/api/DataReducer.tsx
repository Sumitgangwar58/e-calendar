import { ValueI } from "../components/appointment/AddMeetingForm/AddMeetingForm";
import { ContextValueI } from "./DataContext";

export type ActionI =
  | {
      type: "Add";
      payload: { data: ValueI; date: Date };
    }
  | {
      type: "Edit";
      payload: { data: ValueI; index: Number; date: Date };
    }
  | {
      type: "Delete";
      payload: { index: Number; date: Date };
    }
  | {
      type: "Add User";
      payload: string;
    };

const formatDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const dataReducer = (state: ContextValueI, action: ActionI) => {
  let newState = state;
  switch (action.type) {
    case "Add":
      const dateKey = formatDate(action.payload.date);
      const prevData = state[dateKey] || [];
      const newData = [...prevData, action.payload.data];
      newState = {
        ...state,
        [dateKey]: newData,
      };
      break;
    case "Edit":
      const editDateKey = formatDate(action.payload.date);
      const currData = state[editDateKey] || [];
      const editedData = currData.map((item, index) =>
        index !== action.payload.index ? item : action.payload.data
      );
      newState = {
        ...state,
        [editDateKey]: editedData,
      };
      break;
    case "Delete":
      const deleteDateKey = formatDate(action.payload.date);
      const existingData = state[deleteDateKey] || [];
      const filteredData = existingData.filter(
        (_, index) => index !== action.payload.index
      );
      newState = {
        ...state,
        [deleteDateKey]: filteredData,
      };

      if (!newState[deleteDateKey].length) delete newState[deleteDateKey];

      break;
    default:
      newState = state;
  }
  //   localStorage.setItem("meeting", JSON.stringify(newState));
  return newState;
};

const reducerForUser = (state: ContextValueI, action: ActionI) => {
  const newState = dataReducer(state, action);
  localStorage.setItem("meeting", JSON.stringify(newState));
  return newState;
};
export const getReducer = (user: string | null) =>
  user ? reducerForUser : dataReducer;
