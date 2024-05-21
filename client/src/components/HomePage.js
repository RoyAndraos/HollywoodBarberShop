import { styled } from "styled-components";
import { useContext } from "react";
import { IsMobileContext } from "./contexts/IsMobileContext";
import FooterPc from "./FooterPc";
import PCHomePage from "./PCHomePage";
import ImageSlideShow from "./homepage/ImageSlideShow";
const HomePage = () => {
  const { isMobile } = useContext(IsMobileContext);
  return (
    <Container>
      {isMobile ? <ImageSlideShow /> : <PCHomePage />}
      {!isMobile && <FooterPc />}
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
  @media (min-width: 768px) {
    overflow-y: unset;
    scroll-snap-type: unset;
    background-color: black;
  }
`;

export default HomePage;
