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
import Signup from "./components/account/Signup";
import Login from "./components/account/Login";
import Loader from "./components/float-fixed/Loader";
import { ServiceContext } from "./components/contexts/ServiceContext";
import Profile from "./components/account/Profile";
import YourRes from "./components/rsvp/YourRes";
import { useRef } from "react";
import { LanguageContext } from "./components/contexts/LanguageContext";
import Header from "./components/Header";
import { IsMobileContext } from "./components/contexts/IsMobileContext";
const App = () => {
  const { setBarberInfo, barberInfo } = useContext(BarberContext);
  const { setText, text } = useContext(TextContext);
  const { setImages, images } = useContext(ImageContext);
  const { setUserInfo } = useContext(UserContext);
  const { setServices, services } = useContext(ServiceContext);
  const { language } = useContext(LanguageContext);
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
    if (language === "") return;
    fetch("/getWebsiteInfo")
      .then((res) => res.json())
      .then((data) => {
        setBarberInfo(data.barbers);
        setText(data.text);
        setImages(data.images);
        setServices(data.services);
      });
  }, [setBarberInfo, setText, setImages, setUserInfo, setServices, language]);
  if (!barberInfo || !text || !images || !services) return <Loader />;
  return (
    <Container ref={containerRef} onScroll={handleScroll}>
      <GlobalStyles />
      {!isMobile && <Header />}
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/book"} element={<RSVP />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profile/:_id"} element={<Profile />} />
        <Route path={"/yourReservation/:_id"} element={<YourRes />} />1
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
