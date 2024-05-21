import { useContext, useEffect, useState } from "react";
import { Title, Wrapper, TitleWrapper } from "./Menu";
import { styled } from "styled-components";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
import Loader from "../float-fixed/Loader";
const About = () => {
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const [textState, setText] = useState(null);
  const [aboutImage, setAboutImage] = useState(null);
  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getAbout")
      .then((res) => res.json())
      .then((data) => {
        setText(data.aboutText[0]);
        setAboutImage(data.aboutImage[0]);
      });
  }, []);
  if (!textState || !aboutImage) {
    return <Loader />;
  }
  return (
    <Wrapper
      key={"about-section"}
      style={{ paddingBottom: "20px" }}
      $isMobile={isMobile}
      id="about-section"
    >
      <TitleWrapper>
        <Title>{language === "en" ? "About" : "A propos"}</Title>
      </TitleWrapper>
      <StoryContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
        </div>
        {isMobile
          ? "* * * * * * * * * * * * * * * * * * * * * * * * * * * *"
          : ""}
        <ImageContainer>
          <StyledImage src={aboutImage.src} alt="shop image"></StyledImage>
        </ImageContainer>
        {isMobile
          ? "* * * * * * * * * * * * * * * * * * * * * * * * * * * *"
          : ""}
      </StoryContainer>
      ***
    </Wrapper>
  );
};

const StoryContainer = styled.div`
  width: 90vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color: #035e3f;
  padding: 20px 0;
  border-radius: 20px;
  margin-bottom: 20px;
`;
const Story = styled.div`
  width: 90%;
  font-size: 1rem;
  line-height: 1.1;
  letter-spacing: 0.1rem;
  font-family: "Lato", sans-serif;
  margin: 20px 0 20px 0;
  &:last-of-type {
    margin-bottom: 40px;
  }
`;
const StyledImage = styled.img`
  border-radius: 20px;
  max-height: 30vh;
  width: 70vw;
  object-fit: cover;
`;
const ImageContainer = styled.div`
  background-color: transparent;
  width: 90vw;
  display: flex;
  justify-content: center;
  padding-bottom: 2vh;
  padding-top: 10px;
`;
export default About;
