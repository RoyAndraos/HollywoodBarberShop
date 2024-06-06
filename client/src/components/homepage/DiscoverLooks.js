import styled from "styled-components";
import { useState, useContext } from "react";
import { useSwipeable } from "react-swipeable";
import PcSize1 from "../../assets/PcSize1.jpg";
import PcSize2 from "../../assets/PcSize2.jpg"; // Add more images as needed
import PcSize3 from "../../assets/PcSize3.jpg"; // Add more images as needed
import { LanguageContext } from "../contexts/LanguageContext";

const DiscoverLooks = () => {
  const [showImages, setShowImages] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useContext(LanguageContext);
  const images = [PcSize1, PcSize2, PcSize3]; // Add more images to the array as needed

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
  width: 100vw;
  flex-shrink: 0;
  object-fit: contain;
`;

export default DiscoverLooks;
