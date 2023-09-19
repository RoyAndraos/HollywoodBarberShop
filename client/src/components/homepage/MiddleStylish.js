import React, { useContext } from "react";
import { styled } from "styled-components";
import { TextContext } from "../contexts/TextContext";
import Loader from "../float-fixed/Loader";

const MiddleStylish = () => {
  const { text } = useContext(TextContext);
  if (!text) {
    return <Loader />;
  } else {
    const StylishText = text.filter((text) => text._id === "slideshow")[0]
      .content;

    return (
      <Wrapper>
        <WordContainer>
          * * *
          <FirstContainer>
            <Modern key={StylishText[0]}>{StylishText[0].split(" ")[0]}</Modern>
            <Modern key={StylishText[0] + ".1"}>
              {StylishText[0].split(" ")[1]}
            </Modern>
          </FirstContainer>
          <SecondContainer>
            *
            <SecondWrap>
              <Modern key={StylishText[1]}>
                {StylishText[1].split(" ")[0]}
              </Modern>
              <Modern> {StylishText[1].split(" ")[1]}</Modern>
            </SecondWrap>
            *
          </SecondContainer>
          <ThirdContainer>
            <Modern key={StylishText[2]}>{StylishText[2]}</Modern>
          </ThirdContainer>
          * * *
        </WordContainer>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 1000;
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
