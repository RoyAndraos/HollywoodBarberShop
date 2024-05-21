import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import ImageSlideShow from "./components/homepage/ImageSlideShow";
import { Routes, Route } from "react-router-dom";
import RSVP from "./components/rsvp/RSVP";
import { useContext } from "react";
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
import FooterPc from "./components/FooterPc";
const App = () => {
  const { isMobile } = useContext(IsMobileContext);
  const containerRef = useRef(null);
  const handleScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const container = containerRef.current;
    const snapElements = container.querySelectorAll(".snap-element");
    snapElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      // Check if the element is close enough to snap
      if (rect.top >= containerRect.top && rect.top <= containerRect.bottom) {
        // Scroll to the element
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  return (
    <Container ref={containerRef} onScroll={handleScroll}>
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
                  <>
                    <PCHomePage />
                    <FooterPc />
                  </>
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
  background-color: #011c13;
  height: 100vh;
  position: relative;
  z-index: 0;
`;

export default App;
