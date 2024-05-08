import { useContext, useEffect, useState } from "react";
import { TextContext } from "./contexts/TextContext";
import { ImageContext } from "./contexts/ImageContext";
import { LanguageContext } from "./contexts/LanguageContext";
import styled from "styled-components";
const AboutPC = () => {
  const { text } = useContext(TextContext);
  const { images } = useContext(ImageContext);
  const { language } = useContext(LanguageContext);
  const aboutText = text.filter((text) => text._id === "about")[0].content;
  const frenchAboutText = text.filter((text) => text._id === "about")[0].french;
  const aboutImage = images.filter((image) => image.filename === "about")[0];
  const aboutBackground = images.filter((image) => {
    return image.filename === "aboutBackground";
  })[0].src;
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = aboutBackground;
  }, [aboutBackground]);
  return (
    <Wrapper id="about-section">
      <Title>Hollywood Barber Shop</Title>
      <Left>
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
        <StyledImg $src={aboutImage.src} alt="shop image"></StyledImg>
      </Left>
      {imageLoaded && <StyledBG src={aboutBackground} />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  border-left: ${(props) => (props.$isMobile ? "5px solid #011c13" : "none")};
  border-right: ${(props) => (props.$isMobile ? "5px solid #011c13" : "none")};
  background-color: #011c13;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 5%;
  color: white;
  height: 70vh;
  position: relative;
  scroll-snap-align: start;
  top: -8vh;
  width: 100%;
  margin-bottom: 4vh;
`;
const Story = styled.p`
  text-align: left;
  font-size: 20px;
  line-height: 1.5;
  color: whitesmoke;
  padding: 0 20px 0 20px;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;
const Title = styled.h1`
  color: rgba(243, 238, 211, 0.9);
  position: absolute;
  top: 15%;
  left: 5%;
  z-index: 3;
  font-size: 35px;
  @media (max-width: 1000px) {
    font-size: 25px;
  }
`;
const Left = styled.div`
  position: relative;
  width: 80vw;
  height: 50vh;
  top: 6vh;
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(1, 28, 19, 0.5);
`;

const StyledImg = styled.div`
  background-image: ${(props) => `url(${props.$src})`};
  background-size: cover;
  background-position: right 35% bottom 65%;
  border-radius: 5px;
  width: 25vw;
  height: 45vh;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
`;
const StyledBG = styled.img`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  object-fit: cover;
  top: 10vh;
  clip-path: polygon(38% 16%, 48% 0, 100% 0, 100% 100%, 0 100%, 0% 60%, 0 20%);
  z-index: 1;
`;

const StoryWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 20px;
  padding: 50px 30px;
  border-radius: 10px;
  max-width: 50%;
`;
export default AboutPC;
