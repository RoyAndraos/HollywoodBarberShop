import React from "react";
import { styled } from "styled-components";

const MiddleStylish = () => {
  return (
    <Wrapper>
      <WordContainer>
        * * *
        <FirstContainer>
          <Modern>MODERN</Modern>

          <Modern> CUTS </Modern>
        </FirstContainer>
        <SecondContainer>
          <Modern>QUALITY</Modern>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "150%",
              transform: "translateX(-16%)",
            }}
          >
            *<Modern>SERVICE</Modern>*
          </div>
        </SecondContainer>
        <ThirdContainer>
          <Modern>FRESH</Modern>
          <Modern> LOOKS </Modern>
        </ThirdContainer>
        * * *
      </WordContainer>
    </Wrapper>
  );
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
  box-shadow: 0 18px 6px -6px black;
`;

const FirstContainer = styled.div`
  border-bottom: 5px double whitesmoke;
  padding-bottom: 20px;
  text-align: center;
  text-shadow: 5px 5px 5px black;
  width: 100%;
`;
const SecondContainer = styled.div`
  border-bottom: 5px double whitesmoke;
  padding-bottom: 20px;
  text-align: center;
  text-shadow: 5px 5px 5px black;
  width: 100%;
`;
const ThirdContainer = styled.div`
  padding: 20px 10px 20px 10px;
  text-align: center;
  text-shadow: 5px 5px 5px black;
  width: 100%;
`;
const Modern = styled.p`
  font-family: serif;
  font-weight: 900;
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
