import { createContext, ReactNode } from "react";

export const boardContext = createContext({});

export const BoardContextProvider = ({ children, value }: { children: ReactNode, value: any}) => (
    <boardContext.Provider value={value}>{children}</boardContext.Provider>
  );