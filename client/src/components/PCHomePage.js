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
import Loader from "./float-fixed/Loader";
const PCHomePage = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const imgRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [text, setText] = useState(null);
  const [homepageImage, setHomepageImage] = useState(null);
  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getHomePage")
      .then((res) => res.json())
      .then((data) => {
        setText(data.homeText);
        setHomepageImage(data.homeBackground);
      });
  }, []);
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

  if (!text || !homepageImage) {
    return <Loader />;
  } else {
    return (
      <Wrapper ref={main}>
        <StyledImage ref={imgRef} $offsetY={offsetY} src={homepageImage.src} />
        <StylishBookWrapper>
          <WordContainer>
            * * *
            <FirstContainer>
              <Modern key={text.content[0]}>
                {language === "en"
                  ? text.content[0].split(" ")[0]
                  : text.french[0].split(" ")[0]}
              </Modern>
              <Modern>
                {language === "en"
                  ? text.content[0].split(" ")[1]
                  : text.french[0].split(" ")[1]}
              </Modern>
            </FirstContainer>
            <SecondContainer>
              *
              <SecondWrap>
                <Modern key={text.content[1]}>
                  {language === "en"
                    ? text.content[1].split(" ")[0]
                    : text.french[1].split(" ")[0]}
                </Modern>
                <Modern key={text.content[1] + ".1"}>
                  {language === "en"
                    ? text.content[1].split(" ")[1]
                    : text.french[1].split(" ")[1]}
                </Modern>
              </SecondWrap>
              *
            </SecondContainer>
            <ThirdContainer>
              <Modern key={text.content[2]}>
                {language === "en"
                  ? text.content[2].split(" ")[0]
                  : text.french[2].split(" ")[0]}
              </Modern>
              <Modern key={text.content[2] + ".1"}>
                {" "}
                {language === "en"
                  ? text.content[2].split(" ")[1]
                  : text.french[2].split(" ")[1]}
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
