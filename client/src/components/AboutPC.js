import { useContext, useState, useEffect, useRef } from "react";
import { LanguageContext } from "./contexts/LanguageContext";
import styled from "styled-components";
import imgSrc from "../assets/clockWall.jpg";
import { TextContext } from "./contexts/TextContext";
import { TimelineLite } from "gsap";
import PreviousLooks from "./PreviousLooks";
const AboutPC = () => {
  const { language } = useContext(LanguageContext);
  const { text } = useContext(TextContext);
  const aboutText = text.filter((item) => item._id === "about");
  const [imageLoaded, setImageLoaded] = useState(false);
  let coverRef = useRef(null);
  let coverRef2 = useRef(null);
  useEffect(() => {
    const tl = new TimelineLite();
    if (imageLoaded) {
      tl.to(coverRef, { height: 0, duration: 0.8, delay: 1 }).to(coverRef2, {
        height: 0,
        duration: 0.8,
        delay: -0.8,
      });
    }
  }, [imageLoaded]);

  return (
    <Wrapper id="about-section">
      <BottomWrapper>
        <StoryWrapper>
          <Story>
            {language === "en"
              ? aboutText[0].content.split(".")[0] +
                aboutText[0].content.split(".")[1]
              : aboutText[0].french.split(".")[0] +
                aboutText[0].french.split(".")[1]}
            .
          </Story>
          <Story>
            {language === "en"
              ? aboutText[0].content.split(".")[1] +
                aboutText[0].content.split(".")[1]
              : aboutText[0].french.split(".")[1] +
                aboutText[0].french.split(".")[1]}
            .
          </Story>
        </StoryWrapper>
        <CoverText ref={(el) => (coverRef2 = el)} key={"textSide"} />
        <PreviousLooks />
      </BottomWrapper>
      <Cover ref={(el) => (coverRef = el)} />
      <StyledImg
        src={imgSrc}
        alt="shop image"
        onLoad={() => setImageLoaded(true)}
      ></StyledImg>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background-color: #006044;
  display: flex;
  width: 100%;
  min-height: 100vh;
  color: #eeebde;
  place-content: center;
  position: relative;
`;
const Story = styled.p`
  text-align: center;
  font-size: 20px;
  line-height: 1.5;
  color: #eeebde;
  padding: 0 20px 0 20px;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;
const BottomWrapper = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  top: 40vh;
  height: 52vh;
  letter-spacing: 1px;
  background-color: #006044;
  height: 100%;
  padding-bottom: 20px;
`;

const StyledImg = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 40vh;
  object-fit: cover;
`;

const StoryWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 20px;
  padding: 50px 30px;
  border-radius: 10px;
  width: 70%;
`;

const Cover = styled.div`
  position: absolute;
  left: -1%;
  width: 101%;
  height: 40vh;
  top: 0;
  background-color: #006044;
  z-index: 10;
`;
const CoverText = styled.div`
  position: absolute;
  width: 100%;
  height: 60vh;
  background-color: #006044;
  z-index: 10;
`;
export default AboutPC;
