import { styled } from "styled-components";
import ImageSlideShow from "./homepage/ImageSlideShow";
import Menu from "./homepage/Menu";
import Barbers from "./homepage/Barbers";
import About from "./homepage/About";

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
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  z-index: 0;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export default HomePage;
