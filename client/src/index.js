import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ReferenceProvider } from "./components/ReferenceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReferenceProvider>
        <App>{Children}</App>
      </ReferenceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
