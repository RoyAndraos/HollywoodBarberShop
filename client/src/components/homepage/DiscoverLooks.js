import styled from "styled-components";
import { useState, useContext } from "react";
import { useSwipeable } from "react-swipeable";
import hollywood18 from "../../assets/hollywood-web design-18.jpg";
import hollywood19 from "../../assets/hollywood-web design-19.jpg";
import hollywood20 from "../../assets/hollywood-web design-20.jpg";
import hollywood21 from "../../assets/hollywood-web design-21.jpg";
import hollywood22 from "../../assets/hollywood-web design-22.jpg";
import hollywood23 from "../../assets/hollywood-web design-23.jpg";
import hollywood24 from "../../assets/hollywood-web design-24.jpg";
import hollywood25 from "../../assets/hollywood-web design-25.jpg";
import hollywood26 from "../../assets/hollywood-web design-26.jpg";
import hollywood27 from "../../assets/hollywood-web design-27.jpg";
import hollywood28 from "../../assets/hollywood-web design-28.jpg";
import hollywood29 from "../../assets/hollywood-web design-29.jpg";
import hollywood30 from "../../assets/hollywood-web design-30.jpg";

import { LanguageContext } from "../contexts/LanguageContext";

const DiscoverLooks = () => {
  const [showImages, setShowImages] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useContext(LanguageContext);
  const images = [
    hollywood18,
    hollywood19,
    hollywood20,
    hollywood21,
    hollywood22,
    hollywood23,
    hollywood24,
    hollywood25,
    hollywood26,
    hollywood27,
    hollywood28,
    hollywood29,
    hollywood30,
  ]; // Add more images to the array as needed

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentSlide((currentSlide + 1) % images.length),
    onSwipedRight: () =>
      setCurrentSlide((currentSlide - 1 + images.length) % images.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Wrapper
      onClick={(e) => {
        if (e.target[Object.keys(e.target)[0]].elementType === "div")
          setShowImages(false);
      }}
    >
      <button
        onClick={() => {
          setShowImages(!showImages);
        }}
      >
        {language === "en" ? "DISCOVER OUR LOOKS" : "DECOUVREZ NOS LOOKS"}
      </button>
      {showImages && (
        <ImgWrapper {...handlers}>
          <SlideShow $currentSlide={currentSlide}>
            {images.map((src, index) => (
              <StyledImg src={src} alt={`look ${index + 1}`} key={index} />
            ))}
          </SlideShow>
          <Counter>{currentSlide + 1 + "/" + images.length}</Counter>
        </ImgWrapper>
      )}
    </Wrapper>
  );
};

const Counter = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeebde;
  button {
    background-color: #006044;
    border: none;
    color: #eeebde;
    font-size: 1.1rem;
    padding: 11px 15px;
    margin-top: 10vh;
    margin-bottom: 10vh;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: -6px 6px 6px 0 rgb(0 0 0 / 15%);
  }
`;

const ImgWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  height: 100vh;
  width: 100vw;
  z-index: 1001;
  overflow: hidden;
`;

const SlideShow = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $currentSlide }) => `translateX(-${$currentSlide * 100}vw)`};
  width: 100%;
`;

const StyledImg = styled.img`
  width: 90vw;
  margin-left: 5vw;
  margin-right: 5vw;
  flex-shrink: 0;
  object-fit: contain;
`;

export default DiscoverLooks;
