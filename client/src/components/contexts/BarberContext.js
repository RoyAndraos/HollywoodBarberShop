import { createContext, useState } from "react";

export const BarberContext = createContext("");

export const BarberProvider = ({ children }) => {
  const [barberInfo, setBarberInfo] = useState();
  return (
    <BarberContext.Provider value={{ barberInfo, setBarberInfo }}>
      {children}
    </BarberContext.Provider>
  );
};
