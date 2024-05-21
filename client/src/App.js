import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import RSVP from "./components/rsvp/RSVP";
import { useEffect, useContext } from "react";
import { BarberContext } from "./components/contexts/BarberContext";
import { TextContext } from "./components/contexts/TextContext";
import { ImageContext } from "./components/contexts/ImageContext";
import { UserContext } from "./components/contexts/UserContext";
import Loader from "./components/float-fixed/Loader";
import { ServiceContext } from "./components/contexts/ServiceContext";
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
const App = () => {
  const { setBarberInfo, barberInfo } = useContext(BarberContext);
  const { setText, text } = useContext(TextContext);
  const { setImages, images } = useContext(ImageContext);
  const { setUserInfo } = useContext(UserContext);
  const { setServices, services } = useContext(ServiceContext);
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
  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getWebsiteInfo")
      .then((res) => res.json())
      .then((data) => {
        setBarberInfo(data.barbers);
        setText(data.text);
        setImages(data.images);
        setServices(data.services);
      });
  }, [setBarberInfo, setText, setImages, setUserInfo, setServices]);
  if (!barberInfo || !text || !images || !services) return <Loader />;
  return (
    <Container ref={containerRef} onScroll={handleScroll}>
      <GlobalStyles />
      {!isMobile && <Header />}
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        {isMobile ? (
          <>
            <Route path={"/about"} element={<About />} />
            <Route path={"/ourServices"} element={<Menu />} />
            <Route path={"/ourTeam"} element={<Barbers />} />
          </>
        ) : (
          <>
            <Route path={"/about"} element={<AboutPC />} />
            <Route path={"/ourServices"} element={<MenuPC />} />
            <Route path={"/ourTeam"} element={<BarbersPc />} />
          </>
        )}
        <Route path={"/book"} element={<RSVP />} />
        <Route path={"/yourReservation/:_id"} element={<YourRes />} />
        <Route path={"/cancelReservation"} element={<CancelReservation />} />
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  height: 100vh;
  position: relative;
  z-index: 0;
`;

export default App;
