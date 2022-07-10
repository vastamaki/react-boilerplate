import { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
export const Context = createContext({});
export const ContextProvider = ({ children }: any) => (
  <Context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </Context.Provider>
);
export const useStateValue = () => useContext(Context);
