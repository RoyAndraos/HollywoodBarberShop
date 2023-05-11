import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
const App = () => {
  return (
    <Container>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path={"/admin"} element={<Admin />} />
      </Routes>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default App;
