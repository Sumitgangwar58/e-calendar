import React, { Dispatch, createContext, useReducer, useState } from "react";
import { ValueI } from "../components/appointment/AddMeetingForm/AddMeetingForm";

interface ContextValueI {
  [key: string]: ValueI[];
}

const initialContextValue: ContextValueI = JSON.parse(
  localStorage.getItem("meeting") ?? `{}`
);

export const dataContext = createContext<{
  data: ContextValueI;
  dispatch: Dispatch<ActionI>;
}>({
  data: initialContextValue,
  dispatch: () => {},
});

const formatDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

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
    };

const dataReducer = (state: ContextValueI, action: ActionI) => {
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
      break;
    default:
      newState = state;
  }

  localStorage.setItem("meeting", JSON.stringify(newState));
  return newState;
};

interface DataContextProviderProps {
  children: React.ReactNode;
}

const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const [data, dispatch] = useReducer(dataReducer, initialContextValue);

  return (
    <dataContext.Provider value={{ data, dispatch }}>
      {children}
    </dataContext.Provider>
  );
};

export default DataContextProvider;
