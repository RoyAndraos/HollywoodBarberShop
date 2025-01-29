import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { Routes, Route } from "react-router-dom";
import RSVP from "./components/rsvp/RSVP";
import { useContext, useEffect } from "react";
import YourRes from "./components/rsvp/YourRes";
import { useRef } from "react";
import Header from "./components/Header";
import { IsMobileContext } from "./components/contexts/IsMobileContext";
import AboutPC from "./components/AboutPC";
import MenuPC from "./components/MenuPC";
import BarbersPc from "./components/BarbersPc";
import TransitionComponent from "./components/TransitionComponent";
import PCHomePage from "./components/PCHomePage";
import { BarberContext } from "./components/contexts/BarberContext";
import { ServiceContext } from "./components/contexts/ServiceContext";
import { TextContext } from "./components/contexts/TextContext";
import Loader from "./components/float-fixed/Loader";
import MobileHome from "./components/homepage/MobileHome";
import ConfirmCancel from "./components/ConfirmCancel";
import CancelReservation from "./components/rsvp/CancelReservation";
// import { ServicesEmpContext } from "./components/contexts/ServicesEmpContext";
import CancelRes from "./components/CancelRes";
import Notice from "./components/rsvp/Notice";
const App = () => {
  const { isMobile } = useContext(IsMobileContext);
  const containerRef = useRef(null);
  const { setBarberInfo, barberInfo } = useContext(BarberContext);
  const { setServices, services } = useContext(ServiceContext);
  const { setText, text } = useContext(TextContext);
  // const { servicesEmp, setServicesEmp } = useContext(ServicesEmpContext);
  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getWebsiteInfo")
      .then((res) => res.json())
      .then((data) => {
        setBarberInfo(data.barbers);
        setText(data.text);
        setServices(data.services);
        // setServicesEmp(data.servicesEmp);
      });
  }, [
    setBarberInfo,
    setServices,
    setText,
    // setServicesEmp
  ]);
  if (
    !text ||
    !barberInfo ||
    !services
    //  || !servicesEmp
  )
    return <Loader />;
  return (
    <Container ref={containerRef}>
      <GlobalStyles />
      {!isMobile && <Header />}
      <Routes>
        {isMobile ? (
          <Route path="/" element={<MobileHome />}></Route>
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
            <Route
              path={"/cancelRes"}
              element={
                <TransitionComponent>
                  <CancelReservation />
                </TransitionComponent>
              }
            />
            <Route
              path={"/notice"}
              element={
                <TransitionComponent>
                  <Notice />
                </TransitionComponent>
              }
            />{" "}
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
          path={"/confirmCancel"}
          element={
            <TransitionComponent>
              <ConfirmCancel />
            </TransitionComponent>
          }
        />
        <Route
          path={"/cancel/:_id"}
          element={
            <TransitionComponent>
              <CancelRes />
            </TransitionComponent>
          }
        />
        <Route
          path={"/cancelRes"}
          element={
            <TransitionComponent>
              <CancelReservation />
            </TransitionComponent>
          }
        />
        <Route
          path={"/notice"}
          element={
            <TransitionComponent>
              <Notice />
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
