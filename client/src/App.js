import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Book from "./components/Book";
const App = () => {
  return (
    <Container>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/book"} element={<Book />} />
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
