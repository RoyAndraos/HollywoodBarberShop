import { styled } from "styled-components";
import ImageSlideShow from "./ImageSlideShow";
import Menu from "./Menu";
import Barbers from "./Barbers";
import About from "./About";

const HomePage = () => {
  return (
    <Container>
      <ImageSlideShow />
      <Menu />
      <Barbers />
      <About />
    </Container>
  );
};

const Container = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  border-bottom: 10px solid #011c13;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export default HomePage;
