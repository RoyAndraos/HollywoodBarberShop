import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ImageProvider } from "./components/contexts/ImageContext";
import { Children } from "react";
import { BarberProvider } from "./components/contexts/BarberContext";
import { TextProvider } from "./components/contexts/TextContext";
import { UserProvider } from "./components/contexts/UserContext";
import { ServiceProvider } from "./components/contexts/ServiceContext";
import { LanguageProvider } from "./components/contexts/LanguageContext";
import { IsMobileProvider } from "./components/contexts/IsMobileContext";
import { TransitionProvider } from "./components/contexts/TransitionContext";
// import { ServicesEmpProvider } from "./components/contexts/ServicesEmpContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TransitionProvider>
        <UserProvider>
          <BarberProvider>
            <ImageProvider>
              <TextProvider>
                <ServiceProvider>
                  <LanguageProvider>
                    <IsMobileProvider>
                      {/* <ServicesEmpProvider> */}
                      <App>{Children}</App>
                      {/* </ServicesEmpProvider> */}
                    </IsMobileProvider>
                  </LanguageProvider>
                </ServiceProvider>
              </TextProvider>
            </ImageProvider>
          </BarberProvider>
        </UserProvider>
      </TransitionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
