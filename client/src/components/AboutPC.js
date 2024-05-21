import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "./contexts/LanguageContext";
import styled from "styled-components";
import Loader from "./float-fixed/Loader";
const AboutPC = () => {
  const { language } = useContext(LanguageContext);
  const [textState, setText] = useState(null);
  const [aboutImage, setAboutImage] = useState(null);
  const [aboutBackground, setAboutBackground] = useState(null);
  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getAbout")
      .then((res) => res.json())
      .then((data) => {
        setText(data.aboutText[0]);
        setAboutImage(data.aboutImage[0]);
        setAboutBackground(data.aboutBackground[0]);
      });
  }, []);
  if (!textState || !aboutImage || !aboutBackground) {
    return <Loader />;
  }
  return (
    <Wrapper id="about-section">
      <Title>Hollywood Barber Shop</Title>
      <Left>
        <StoryWrapper>
          <Story>
            {language === "en"
              ? textState.content.split(".")[0]
              : textState.french.split(".")[0]}
            .
          </Story>
          <Story>
            {language === "en"
              ? textState.content.split(".")[1]
              : textState.french.split(".")[1]}
            .
          </Story>
        </StoryWrapper>
        <StyledImg $src={aboutImage.src} alt="shop image"></StyledImg>
      </Left>
      <StyledBG src={aboutBackground.src} alt="barber shop" />
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
