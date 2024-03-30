import React, { useContext } from "react";
import { styled } from "styled-components";
import { TextContext } from "../contexts/TextContext";
import Loader from "../float-fixed/Loader";
import { LanguageContext } from "../contexts/LanguageContext";

const MiddleStylish = () => {
  const { text } = useContext(TextContext);
  const { language } = useContext(LanguageContext);
  if (!text) {
    return <Loader />;
  } else {
    const StylishText = text.filter((text) => text._id === "slideshow")[0]
      .content;
    const frenchStylishText = text.filter((text) => text._id === "slideshow")[0]
      .french;
    return (
      <Wrapper>
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
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 9;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  font-size: 1.3rem;
  color: white;
  height: 76vh;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 85vw;
`;

export const SecondWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const FirstContainer = styled.div`
  border-bottom: 1px solid whitesmoke;
  font-family: "nexa-rust-slab-black-2", sans-serif;
  font-weight: 900;
  font-style: normal;
  letter-spacing: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30%;
  text-shadow: 0 0 15px black;
  width: 100%;
`;
export const SecondContainer = styled.div`
  border-bottom: 1px solid whitesmoke;
  font-family: "nexa-rust-slab-black-2", sans-serif;
  font-weight: 900;
  font-style: normal;
  letter-spacing: 3px;
  display: flex;
  height: 30%;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 15px black;
  width: 100%;
`;
export const ThirdContainer = styled.div`
  display: flex;
  font-family: "nexa-rust-slab-black-2", sans-serif;
  font-weight: 900;
  font-style: normal;
  letter-spacing: 3px;
  height: 30%;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 15px black;
  flex-direction: column;
  width: 100%;
`;
export const Modern = styled.p`
  text-align: center;
  display: block;
  width: 100%;
  padding: 0 20px;
  font-size: clamp(1rem, 1.5vw, 1.6rem);
  text-shadow: 7px 7px 3px black;
`;

export const WordContainer = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
export default MiddleStylish;
