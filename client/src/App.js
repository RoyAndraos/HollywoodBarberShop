import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Admin from "./Admin/Admin";
import { useLocation } from "react-router-dom";
import Dashboard from "./Admin/Dashboard";
import Schedule from "./Admin/Schedule";
import NavBar from "./Admin/NavBar";

const App = () => {
  const location = useLocation();
  return (
    <Container>
      <GlobalStyles />
      {!location.pathname.includes("/admin") && <Header />}
      {location.pathname.includes("/admin/dashboard") && <NavBar />}
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/admin"} element={<Admin />} />
        <Route path={"/admin/dashboard"} element={<Dashboard />} />
        <Route path={"/admin/dashboard/schedule"} element={<Schedule />} />
      </Routes>
      {!location.pathname.includes("/admin") && <Footer />}
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
