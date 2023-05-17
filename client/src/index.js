import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { BarberProvider } from "./BarberReducer";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BarberProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BarberProvider>
  </React.StrictMode>
);
