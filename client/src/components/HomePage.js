import { styled } from "styled-components";
import ImageSlideShow from "./homepage/ImageSlideShow";
import Menu from "./homepage/Menu";
import { useContext } from "react";
import { IsMobileContext } from "./contexts/IsMobileContext";
import PCHomePage from "./PCHomePage";
import MenuPC from "./MenuPC";
import FooterPc from "./FooterPc";
const HomePage = () => {
  const { isMobile } = useContext(IsMobileContext);
  return (
    <Container>
      {isMobile ? <ImageSlideShow /> : <PCHomePage />}
      {isMobile ? <Menu /> : <MenuPC />}
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
