import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
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
import { ImageContext } from "./contexts/ImageContext";
const PCHomePage = () => {
  const navigate = useNavigate();
  const { text } = useContext(TextContext);
  const { language } = useContext(LanguageContext);
  const imgRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { images } = useContext(ImageContext);
  const [offsetY, setOffsetY] = useState(0);
  const homepageImageSrc = images.filter(
    (image) => image.filename === "homepageBackground"
  )[0].src;
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = homepageImageSrc;
  }, [homepageImageSrc]);
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

  if (!text) {
    return <Loader />;
  } else {
    const StylishText = text.filter((text) => text._id === "slideshow")[0]
      .content;
    const frenchStylishText = text.filter((text) => text._id === "slideshow")[0]
      .french;
    return (
      <Wrapper ref={main}>
        {imageLoaded && (
          <StyledImage ref={imgRef} $offsetY={offsetY} src={homepageImageSrc} />
        )}

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
          <BookButton onClick={() => navigate("/book")}>
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
  top: 4vh;
  margin-bottom: 4vh;
  z-index: 10;
  background-color: black;
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
`;

const BookButton = styled.button`
  height: auto;
  background-color: #035e3f;
  color: whitesmoke;
  font-size: clamp(1rem, 1.5vw, 1.6rem);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-family: "octin-prison", sans-serif;
  font-weight: 900;
  font-style: normal;
  border: none;
  letter-spacing: 2px;
  padding: 15px 30px;
  &:hover {
    transform: scale(1.02);
    background-color: whitesmoke;
    color: #035e3f;
  }
`;

const StylishBookWrapper = styled.div`
  position: absolute;
  right: 15%;
  top: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: whitesmoke;
  min-width: 20%;
  height: 60%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 50px 50px;
  border-radius: 10px;
  transform: translateY(-50%);
`;

export default PCHomePage;
