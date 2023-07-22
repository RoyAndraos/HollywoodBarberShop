import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Container>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
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
`;

export default App;
