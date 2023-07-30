import React, { createContext, useRef } from "react";

export const ReferenceContext = createContext();

export const ReferenceProvider = ({ children }) => {
  const menuRef = useRef(null);
  const barbersRef = useRef(null);
  const aboutRef = useRef(null);

  return (
    <ReferenceContext.Provider value={{ menuRef, barbersRef, aboutRef }}>
      {children}
    </ReferenceContext.Provider>
  );
};
