import React,{ createContext, useReducer } from 'react';
import {initialState} from '../reducer/globalReducer';
import {reducer} from '../reducer/globalReducer';
export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <userContext.Provider value={{state, dispatch}}>
      {children}
    </userContext.Provider>
  );
};
