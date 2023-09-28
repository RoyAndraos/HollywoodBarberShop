import { useContext } from "react";
import { Title, Wrapper, TitleWrapper } from "./Menu";
import { styled } from "styled-components";
import { TextContext } from "../contexts/TextContext";
import { ImageContext } from "../contexts/ImageContext";
import { LanguageContext } from "../contexts/LanguageContext";
const About = () => {
  const { text } = useContext(TextContext);
  const { images } = useContext(ImageContext);
  const { language } = useContext(LanguageContext);
  const aboutText = text.filter((text) => text._id === "about")[0].content;
  const frenchAboutText = text.filter((text) => text._id === "about")[0].french;
  const aboutImage = images.filter((image) => image.filename === "about")[0];
  return (
    <Wrapper
      id="about-section"
      key={"about-section"}
      style={{ paddingBottom: "20px" }}
    >
      <TitleWrapper>
        <Title>{language === "en" ? "About" : "A propos"}</Title>
      </TitleWrapper>
      <StoryContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
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
        </div>
        * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        <ImageContainer>
          <StyledImage src={aboutImage.src} alt="shop image"></StyledImage>
        </ImageContainer>
        * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      </StoryContainer>
      ***
    </Wrapper>
  );
};

const StoryContainer = styled.div`
  width: 96vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #035e3f;
  padding: 20px 0 20px 0;
  border-radius: 20px;
  height: 80vh;
  margin-bottom: 20px;
`;
const Story = styled.div`
  width: 72vw;
  display: inline-block;
  text-align: left;
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.1;
  letter-spacing: 0.1rem;
  font-family: "Lato", sans-serif;
  &:last-of-type {
    margin-bottom: 40px;
  }
`;
const StyledImage = styled.img`
  width: 80vw;
  border-radius: 20px;
`;
const ImageContainer = styled.div`
  background-color: transparent;
  width: 96vw;
  display: flex;
  justify-content: center;
  padding-bottom: 2vh;
  padding-top: 20px;
`;
export default About;
