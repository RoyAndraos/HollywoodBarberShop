import { useContext } from "react";
import { TextContext } from "./contexts/TextContext";
import { ImageContext } from "./contexts/ImageContext";
import { LanguageContext } from "./contexts/LanguageContext";
import styled from "styled-components";
import bg from "../assets/AboutBG.jpg";
const AboutPC = () => {
  const { text } = useContext(TextContext);
  const { images } = useContext(ImageContext);
  const { language } = useContext(LanguageContext);
  const aboutText = text.filter((text) => text._id === "about")[0].content;
  const frenchAboutText = text.filter((text) => text._id === "about")[0].french;
  const aboutImage = images.filter((image) => image.filename === "about")[0];
  return (
    <Wrapper id="about-section">
      <Left>
        <Title>Hollywood Barber Shop</Title>
        <Story>
          {language === "en"
            ? aboutText.split(".")[0]
            : frenchAboutText.split(".")[0]}
          .
        </Story>
        <Story>
          {language === "en"
            ? aboutText.split(".")[1]
            : frenchAboutText.split(".")[1]}
          .
        </Story>
      </Left>
      <Right>
        <StyledImg src={aboutImage.src} alt="shop image" />
      </Right>
      <StyledBG />
      <Filter
        style={{
          clipPath:
            "polygon(50% 0%, 100% 0, 100% 34%, 100% 89%,0 100%,0 12%,32% 15%)",
          top: "10vh",
          width: "100%",
          height: "100%",
        }}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  border-left: ${(props) => (props.$isMobile ? "5px solid #011c13" : "none")};
  border-right: ${(props) => (props.$isMobile ? "5px solid #011c13" : "none")};
  background-color: ${(props) => (props.$isMobile ? "#011c13" : "whitesmoke")};
  padding-top: 3px;
  display: grid;
  justify-content: space-around;
  grid-template-columns: 30% 30%;
  gap: 5%;
  color: white;
  min-height: 70vh;
  position: relative;
  scroll-snap-align: start;
  min-width: 99vw;
  top: -15vh;
`;
const Story = styled.p`
  font-size: clamp(1.3rem, 1.5rem, 1.8rem);
  text-align: left;
  line-height: 1.5;
  padding: 0 20px 0 20px;
  color: whitesmoke;
`;
const Title = styled.h1`
  color: #035e3f;
  display: flex;
  margin: 0 2vw 5vh 2vw;
  font-size: clamp(1.8rem, 2rem, 2.2rem);
`;
const Left = styled.div`
  position: relative;
  top: 20%;
  z-index: 2;
`;
const Right = styled.div`
  z-index: 2;
`;
const StyledImg = styled.img`
  object-fit: cover;
  max-height: 50vh;
  position: relative;
  top: 25%;
  border: 5px solid #011c13;
  border-radius: 20px;
`;
const StyledBG = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${bg});
  background-color: rgba(3, 43, 30, 0.45);
  background-size: cover;
  background-position: right 35% bottom 45%;
  z-index: 1;
  position: absolute;

  top: 10vh;
  clip-path: polygon(
    50% 0%,
    100% 0,
    100% 34%,
    100% 89%,
    0 100%,
    0 12%,
    32% 15%
  );
  z-index: 1;
`;
const Filter = styled.div`
  position: absolute;
  top: 0;
  height: 95%;
  width: 100%;
  background-color: rgba(47, 36, 23, 0.5);
  z-index: 1;
  clip-path: polygon(
    50% 0%,
    100% 0,
    100% 34%,
    100% 89%,
    0 100%,
    0 12%,
    32% 15%
  );
  transition: all 0.1s ease-in-out smooth;
`;
export default AboutPC;
