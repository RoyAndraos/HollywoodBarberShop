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
import Cookies from "js-cookie";
import { ServiceContext } from "./components/contexts/ServiceContext";
import Profile from "./components/account/Profile";
import YourRes from "./components/rsvp/YourRes";
import { useRef } from "react";

const App = () => {
  const { setBarberInfo, barberInfo } = useContext(BarberContext);
  const { setText, text } = useContext(TextContext);
  const { setImages, images } = useContext(ImageContext);
  const { setUserInfo } = useContext(UserContext);
  const { setServices } = useContext(ServiceContext);
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
    const token = Cookies.get("token");
    fetch("/getWebsiteInfo")
      .then((res) => res.json())
      .then((data) => {
        setBarberInfo(data.barbers);
        setText(data.text);
        setImages(data.images);
        setServices(data.services);
      })
      .then(() => {
        // Check if the token exists
        if (token) {
          // Include the token in the headers of the requests
          const headers = {
            Authorization: token,
          };
          fetch("/getUserInfo", { headers })
            .then((res) => res.json())
            .then((data) => {
              setUserInfo(data.data);
            });
        }
      });
  }, [setBarberInfo, setText, setImages, setUserInfo, setServices]);
  if (!barberInfo || !text || !images) return <Loader />;
  return (
    <Container ref={containerRef} onScroll={handleScroll}>
      <GlobalStyles />
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
