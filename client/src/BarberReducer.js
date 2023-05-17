import { createContext, useReducer } from "react";
export const BarberContext = createContext();

const initialState = {};
const reducer = (state, action) => {
  switch (action.type) {
    case "get-barber-info": {
    }
    case "update-Schedule": {
      break;
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};
export const BarberProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BarberContext.Provider
      value={{
        state,
        actions: {},
      }}
    >
      {children}
    </BarberContext.Provider>
  );
};
