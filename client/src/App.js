import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import ImageSlideShow from "./components/homepage/ImageSlideShow";
import { Routes, Route } from "react-router-dom";
import RSVP from "./components/rsvp/RSVP";
import { useContext, useEffect } from "react";
import YourRes from "./components/rsvp/YourRes";
import { useRef } from "react";
import Header from "./components/Header";
import { IsMobileContext } from "./components/contexts/IsMobileContext";
import CancelReservation from "./components/CancelReservation";
import AboutPC from "./components/AboutPC";
import About from "./components/homepage/About";
import Menu from "./components/homepage/Menu";
import MenuPC from "./components/MenuPC";
import Barbers from "./components/homepage/Barbers";
import BarbersPc from "./components/BarbersPc";
import TransitionComponent from "./components/TransitionComponent";
import PCHomePage from "./components/PCHomePage";
import { BarberContext } from "./components/contexts/BarberContext";
import { ServiceContext } from "./components/contexts/ServiceContext";
import { TextContext } from "./components/contexts/TextContext";
import Loader from "./components/float-fixed/Loader";

const App = () => {
  const { isMobile } = useContext(IsMobileContext);
  const containerRef = useRef(null);
  const { setBarberInfo, barberInfo } = useContext(BarberContext);
  const { setServices, services } = useContext(ServiceContext);
  const { setText, text } = useContext(TextContext);
  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getWebsiteInfo")
      .then((res) => res.json())
      .then((data) => {
        setBarberInfo(data.barbers);
        setServices(data.services);
        setText(data.text);
      });
  }, [setBarberInfo, setServices, setText]);
  if (!text || !barberInfo || !services) return <Loader />;
  return (
    <Container ref={containerRef}>
      <GlobalStyles />
      {!isMobile && <Header />}
      <Routes>
        {isMobile ? (
          <>
            <Route
              path={"/"}
              element={
                <TransitionComponent>
                  <ImageSlideShow />
                </TransitionComponent>
              }
            />
            <Route
              path={"/about"}
              element={
                <TransitionComponent>
                  <About />
                </TransitionComponent>
              }
            />
            <Route
              path={"/ourServices"}
              element={
                <TransitionComponent>
                  <Menu />
                </TransitionComponent>
              }
            />
            <Route
              path={"/ourTeam"}
              element={
                <TransitionComponent>
                  <Barbers />
                </TransitionComponent>
              }
            />
          </>
        ) : (
          <>
            <Route
              path={"/"}
              element={
                <TransitionComponent>
                  <PCHomePage />
                </TransitionComponent>
              }
            />
            <Route
              path={"/about"}
              element={
                <TransitionComponent>
                  <AboutPC />
                </TransitionComponent>
              }
            />
            <Route
              path={"/ourServices"}
              element={
                <TransitionComponent>
                  <MenuPC />
                </TransitionComponent>
              }
            />
            <Route
              path={"/ourTeam"}
              element={
                <TransitionComponent>
                  <BarbersPc />
                </TransitionComponent>
              }
            />
          </>
        )}
        <Route
          path={"/book"}
          element={
            <TransitionComponent>
              <RSVP />
            </TransitionComponent>
          }
        />
        <Route
          path={"/yourReservation/:_id"}
          element={
            <TransitionComponent>
              <YourRes />
            </TransitionComponent>
          }
        />
        <Route
          path={"/cancelReservation"}
          element={
            <TransitionComponent>
              <CancelReservation />
            </TransitionComponent>
          }
        />
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  position: relative;
  z-index: 0;
  background-color: #eeebde;
`;

export default App;
