import { styled } from "styled-components";
import ImageSlideShow from "./ImageSlideShow";
import Footer from "./Footer";
const HomePage = () => {
  return (
    <Container>
      <Footer />
      <ImageSlideShow />
    </Container>
  );
};

const Container = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  border-bottom: 5px solid #011c13;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export default HomePage;
