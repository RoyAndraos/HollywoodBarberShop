import { useContext, useEffect, useState } from "react";
import { TextContext } from "./contexts/TextContext";
import { ImageContext } from "./contexts/ImageContext";
import { LanguageContext } from "./contexts/LanguageContext";
import styled from "styled-components";
import bg from "../assets/AboutBG.jpg";
import { Blurhash } from "react-blurhash";
const AboutPC = () => {
  const { text } = useContext(TextContext);
  const { images } = useContext(ImageContext);
  const { language } = useContext(LanguageContext);
  const aboutText = text.filter((text) => text._id === "about")[0].content;
  const frenchAboutText = text.filter((text) => text._id === "about")[0].french;
  const aboutImage = images.filter((image) => image.filename === "about")[0];
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = bg;
  }, []);
  return (
    <Wrapper id="about-section">
      <Left>
        <Title>Hollywood Barber Shop</Title>
        <StoryWrapper>
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
        </StoryWrapper>
      </Left>
      <Right>
        <StyledImg $src={aboutImage.src} alt="shop image"></StyledImg>
      </Right>
      {imageLoaded && <Filter />}
      {!imageLoaded && (
        <Blurhash
          hash="LBCF|y~q?a?a-;a*.8%M?Gxu.8i|"
          width="99.4vw"
          height="70vh"
          resolutionX={32}
          resolutionY={32}
          punch={1}
          style={{
            clipPath:
              "polygon(38% 16%, 48% 0, 100% 0, 100% 100%, 0 100%, 0% 60%, 0 20%)",
            transform: "translateX(-8.8vw) translateY(-44vh)",
          }}
        />
      )}
      {imageLoaded && <StyledBG />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  border-left: ${(props) => (props.$isMobile ? "5px solid #011c13" : "none")};
  border-right: ${(props) => (props.$isMobile ? "5px solid #011c13" : "none")};
  background-color: ${(props) => (props.$isMobile ? "#011c13" : "transparent")};
  display: grid;
  justify-content: space-around;
  grid-template-columns: 30% 30%;
  gap: 5%;
  color: white;
  height: 70vh;
  position: relative;
  scroll-snap-align: start;
  top: -8vh;
  width: 100%;
  background-color: black;
  margin-bottom: 4vh;
`;
const Story = styled.p`
  text-align: left;
  font-size: clamp(1.3rem, 1.5rem, 1.8rem);
  line-height: 1.5;
  color: whitesmoke;
  padding: 0 20px 0 20px;
`;
const Title = styled.h1`
  color: #079061;
  display: flex;
  margin: 0 2vw 5vh 2vw;
  font-size: clamp(1.8rem, 2.5rem, 3.2rem);
`;
const Left = styled.div`
  position: relative;
  top: 20%;
  z-index: 3;
`;
const Right = styled.div`
  z-index: 3;
`;
const StyledImg = styled.div`
  position: relative;
  background-image: ${(props) => `url(${props.$src})`};
  background-size: cover;
  background-position: right 35% bottom 65%;
  top: 30%;
  border-radius: 20px;
  width: 25vw;
  height: 50vh;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
`;
const StyledBG = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${bg});
  background-size: cover;
  background-position: right 35% bottom 45%;
  z-index: 1;
  position: absolute;
  top: 10vh;
  clip-path: polygon(38% 16%, 48% 0, 100% 0, 100% 100%, 0 100%, 0% 60%, 0 20%);
  z-index: 1;
`;
const Filter = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(47, 36, 23, 0.5);
  z-index: 2;
  clip-path: polygon(38% 16%, 48% 0, 100% 0, 100% 100%, 0 100%, 0% 60%, 0 20%);
  transition: all 0.1s ease-in-out smooth;
  top: 10vh;
`;
const StoryWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  left: 50%;
  top: 20%;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 50px 30px;
  border-radius: 10px;
`;
export default AboutPC;
