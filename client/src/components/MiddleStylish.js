import React, { useContext } from "react";
import { styled } from "styled-components";
import { TextContext } from "./contexts/TextContext";
import Loader from "./Loader";

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
            <Modern key={StylishText[0]}>{StylishText[0]}</Modern>
          </FirstContainer>
          <SecondContainer>
            * <Modern key={StylishText[1]}>{StylishText[1]}</Modern> *
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
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  height: 76vh;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 85vw;
  border: 0.1rem dotted grey;
  box-shadow: 0 18px 6px -6px rgba(0, 0, 0, 0.6);
`;

const FirstContainer = styled.div`
  border-bottom: 5px double whitesmoke;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 5px 5px 5px black;
  width: 100%;
`;
const SecondContainer = styled.div`
  border-bottom: 5px double whitesmoke;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 5px 5px 5px black;
  width: 100%;
`;
const ThirdContainer = styled.div`
  padding: 20px 10px 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 5px 5px 5px black;
  width: 100%;
`;
const Modern = styled.p`
  font-family: serif;
  font-weight: 900;
  text-align: center;
  width: 50%;
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
