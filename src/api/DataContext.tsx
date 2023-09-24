import React, {
  Dispatch,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ValueI } from "../components/appointment/AddMeetingForm/AddMeetingForm";
import { ActionI, getReducer } from "./DataReducer";

export interface ContextValueI {
  [key: string]: ValueI[];
}

const initialContextValue: ContextValueI = JSON.parse(
  localStorage.getItem("meeting") ?? `{}`
);

export const dataContext = createContext<{
  data: ContextValueI;
  user: string | null;
  addUser: (name: string | null) => void;
  dispatch: Dispatch<ActionI>;
}>({
  data: initialContextValue,
  dispatch: () => {},
  user: localStorage.getItem("user") ?? null,
  addUser: () => {},
});

interface DataContextProviderProps {
  children: React.ReactNode;
}

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [user, setUser] = useState<null | string>(localStorage.getItem("user"));
  const dataReducer = getReducer(user);
  const [data, dispatch] = useReducer(dataReducer, initialContextValue);

  const addUser = (name: string | null) => {
    if (name) {
      localStorage.setItem("user", name);
    } else localStorage.removeItem("user");

    setUser(name);
  };

  return (
    <dataContext.Provider value={{ data, dispatch, user, addUser }}>
      {children}
    </dataContext.Provider>
  );
};

export default DataContextProvider;
