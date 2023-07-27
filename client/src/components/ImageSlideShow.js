import React, { useState } from "react";
import { styled } from "styled-components";
const ImageSlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleChangeSlide = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };

  return (
    <Wrapper>
      <RadioContainer>
        <input
          type="radio"
          name="slide"
          id="slide1"
          checked={currentSlide === 1}
          onChange={() => handleChangeSlide(1)}
        />
        <input
          type="radio"
          name="slide"
          id="slide2"
          checked={currentSlide === 2}
          onChange={() => handleChangeSlide(2)}
        />
        <input
          type="radio"
          name="slide"
          id="slide3"
          checked={currentSlide === 3}
          onChange={() => handleChangeSlide(3)}
        />
        <input
          type="radio"
          name="slide"
          id="slide4"
          checked={currentSlide === 4}
          onChange={() => handleChangeSlide(4)}
        />
        <input
          type="radio"
          name="slide"
          id="slide5"
          checked={currentSlide === 5}
          onChange={() => handleChangeSlide(5)}
        />
      </RadioContainer>

      <ImageContainer>
        <StyledImage
          src="/assets/casualDay.jpg"
          alt="slide1"
          isactive={(currentSlide === 1).toString()}
        />
        <StyledImage
          src="/assets/chairCloseup.jpg"
          alt="slide2"
          isactive={(currentSlide === 2).toString()}
        />
        <StyledImage
          src="/assets/chairFarBack.jpg"
          alt="slide3"
          isactive={(currentSlide === 3).toString()}
        />
        <StyledImage
          src="/assets/storeFromOuts.jpg"
          alt="slide4"
          isactive={(currentSlide === 4).toString()}
        />

        <StyledImage
          src="/assets/toolCloseUp.jpg"
          alt="slide5"
          isactive={(currentSlide === 5).toString()}
        />
      </ImageContainer>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #011c13;
  z-index: 0;
`;

const ImageContainer = styled.div`
  width: 96vw;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  z-index: 1;
  position: relative;
`;

const RadioContainer = styled.div`
  display: flex;
  z-index: 100;
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.isactive === "true" ? "block" : "none")};
  object-fit: cover;
  position: ${(props) => (props.isactive === "true" ? "absolute" : "static")};
  z-index: ${(props) => (props.isactive === "true" ? "2" : "1")};
`;


export default ImageSlideShow;
