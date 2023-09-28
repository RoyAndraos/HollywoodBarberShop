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
  z-index: 999;
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

const SecondWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FirstContainer = styled.div`
  border-bottom: 1px solid whitesmoke;
  padding-bottom: 20px;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;
const SecondContainer = styled.div`
  border-bottom: 1px solid whitesmoke;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-shadow: 0 0 15px black;
  width: 100%;
`;
const ThirdContainer = styled.div`
  padding: 20px 10px 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
const Modern = styled.p`
  font-weight: 900;
  text-align: center;
  width: 100%;
`;

const WordContainer = styled.div`
  height: 70%;
  transform: translateY(-10%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
export default MiddleStylish;
