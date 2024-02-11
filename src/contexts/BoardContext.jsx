import { createContext } from "react";

export const boardContext = createContext({});

export const BoardContextProvider = ({ children, value }) => (
    <boardContext.Provider value={value}>{children}</boardContext.Provider>
  );