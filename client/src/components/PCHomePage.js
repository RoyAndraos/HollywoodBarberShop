import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import bg from "../assets/bgPC.jpg";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "./contexts/LanguageContext";
import {
  Modern,
  FirstContainer,
  WordContainer,
  SecondContainer,
  ThirdContainer,
  SecondWrap,
} from "./homepage/MiddleStylish";
import { TextContext } from "./contexts/TextContext";
import Loader from "./float-fixed/Loader";
import { gsap } from "gsap";

const PCHomePage = () => {
  const navigate = useNavigate();
  const { text } = useContext(TextContext);
  const { language } = useContext(LanguageContext);
  const imgRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    requestAnimationFrame(() => {
      setOffsetY(window.pageYOffset);
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const main = useRef(null);

  const hoverEffect = () => {
    gsap.to(imgRef.current, { filter: "blur(0px)", duration: 0.7 });
  };
  const leaveEffect = () => {
    gsap.to(imgRef.current, { filter: "blur(5px)", duration: 0.7 });
  };

  if (!text) {
    return <Loader />;
  } else {
    const StylishText = text.filter((text) => text._id === "slideshow")[0]
      .content;
    const frenchStylishText = text.filter((text) => text._id === "slideshow")[0]
      .french;
    return (
      <Wrapper ref={main}>
        <Filter $offsetY={offsetY} />
        <StyledImage ref={imgRef} $offsetY={offsetY} />
        <StylishBookWrapper>
          <WordContainer>
            * * *
            <FirstContainer>
              <Modern key={StylishText[0]}>
                {language === "en"
                  ? StylishText[0].split(" ")[0]
                  : frenchStylishText[0].split(" ")[0]}
              </Modern>
              <Modern>
                {language === "en"
                  ? StylishText[0].split(" ")[1]
                  : frenchStylishText[0].split(" ")[1]}
              </Modern>
            </FirstContainer>
            <SecondContainer>
              *
              <SecondWrap>
                <Modern key={StylishText[1]}>
                  {language === "en"
                    ? StylishText[1].split(" ")[0]
                    : frenchStylishText[1].split(" ")[0]}
                </Modern>
                <Modern key={StylishText[1] + ".1"}>
                  {language === "en"
                    ? StylishText[1].split(" ")[1]
                    : frenchStylishText[1].split(" ")[1]}
                </Modern>
              </SecondWrap>
              *
            </SecondContainer>
            <ThirdContainer>
              <Modern key={StylishText[2]}>
                {language === "en"
                  ? StylishText[2].split(" ")[0]
                  : frenchStylishText[2].split(" ")[0]}
              </Modern>
              <Modern key={StylishText[2] + ".1"}>
                {" "}
                {language === "en"
                  ? StylishText[2].split(" ")[1]
                  : frenchStylishText[2].split(" ")[1]}
              </Modern>
            </ThirdContainer>
            * * *
          </WordContainer>
          <BookButton
            onClick={() => navigate("/book")}
            onMouseEnter={() => {
              hoverEffect();
            }}
            onMouseLeave={() => {
              leaveEffect();
            }}
          >
            {language === "en" ? "Book Now" : "Reserver"}
          </BookButton>
        </StylishBookWrapper>
      </Wrapper>
    );
  }
};
const Wrapper = styled.div`
  height: 85vh;
  width: 100%;
  position: relative;
  top: 7vh;
`;

const StyledImage = styled.div.attrs((props) => ({
  style: {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    behavior: "smooth",
    backgroundPosition: `center ${props.$offsetY * -0.3}px`,
    clipPath: `polygon(0 0, 100% 0%, ${95 + props.$offsetY * 0.01}% 95%, ${
      props.$offsetY * 0.005
    }% 83%)`,
    filter: "blur(5px) brightness(0.5)",
  },
}))`
  height: 95%;
  width: 100%;
`;

const BookButton = styled.button`
  width: 70%;
  height: auto;
  z-index: 1000;
  background-color: #035e3f;
  color: whitesmoke;
  font-size: clamp(1rem, 1.5vw, 1.6rem);
  padding: 20px 0 20px 0;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-family: "octin-prison", sans-serif;
  font-weight: 900;
  font-style: normal;
  border: none;
  letter-spacing: 2px;
  &:hover {
    transform: scale(1.02);
    background-color: whitesmoke;
    color: #035e3f;
  }
`;

const StylishBookWrapper = styled.div`
  position: absolute;
  right: 10%;
  top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: whitesmoke;
  width: 20%;
  height: 55%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
`;
const Filter = styled.div.attrs((props) => ({
  style: {
    clipPath: `polygon(0 0, 100% 0%, ${95 + props.$offsetY * 0.01}% 95%, ${
      props.$offsetY * 0.005
    }% 83%)`,
  },
}))`
  position: absolute;
  top: 0;
  height: 95%;
  width: 100%;
  background-color: rgba(47, 36, 23, 0.5);
  z-index: 1;
  transition: all 0.1s ease-in-out smooth;
`;
export default PCHomePage;
