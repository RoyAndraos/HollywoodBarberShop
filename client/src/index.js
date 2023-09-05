import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ImageProvider } from "./components/contexts/ImageContext";
import { Children } from "react";
import { BarberProvider } from "./components/contexts/BarberContext";
import { TextProvider } from "./components/contexts/TextContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BarberProvider>
        <ImageProvider>
          <TextProvider>
            <App>{Children}</App>
          </TextProvider>
        </ImageProvider>
      </BarberProvider>
    </BrowserRouter>
  </React.StrictMode>
);
