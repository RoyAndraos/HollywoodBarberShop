import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Book from "./components/Book";
import { useEffect, useContext } from "react";
import { BarberContext } from "./components/contexts/BarberContext";
import { TextContext } from "./components/contexts/TextContext";
import { ImageContext } from "./components/contexts/ImageContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
const App = () => {
  const { setBarberInfo } = useContext(BarberContext);
  const { setText } = useContext(TextContext);
  const { setImages } = useContext(ImageContext);
  useEffect(() => {
    fetch("/getWebsiteInfo")
      .then((res) => res.json())
      .then((data) => {
        setBarberInfo(data.barbers);
        setText(data.text);
        setImages(data.images);
      });
  }, [setBarberInfo, setText, setImages]);
  return (
    <Container>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/book"} element={<Book />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.15);
  height: 100vh;
  position: relative;
`;

export default App;
