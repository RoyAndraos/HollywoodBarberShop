import { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import cut1 from "../assets/hollywood-web design-16.jpg";
import cut2 from "../assets/hollywood-web design-17.jpg";
import cut3 from "../assets/hollywood-web design-18.jpg";
import cut4 from "../assets/hollywood-web design-19.jpg";
import cut5 from "../assets/hollywood-web design-20.jpg";
import cut6 from "../assets/hollywood-web design-21.jpg";
import cut7 from "../assets/hollywood-web design-22.jpg";
import cut8 from "../assets/hollywood-web design-23.jpg";
import cut9 from "../assets/hollywood-web design-24.jpg";
import cut10 from "../assets/hollywood-web design-25.jpg";
import cut11 from "../assets/hollywood-web design-26.jpg";
import cut12 from "../assets/hollywood-web design-27.jpg";
import cut13 from "../assets/hollywood-web design-28.jpg";
import cut14 from "../assets/hollywood-web design-29.jpg";
import cut15 from "../assets/hollywood-web design-30.jpg";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { LanguageContext } from "./contexts/LanguageContext";
import { IsMobileContext } from "./contexts/IsMobileContext";

const PreviousLooks = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const handleNextSlide = (e) => {
    e.preventDefault();
    setCurrentSlide((prevSlide) => (prevSlide === 11 ? 0 : prevSlide + 1));
  };

  const handlePrevSlide = (e) => {
    e.preventDefault();
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 11 : prevSlide - 1));
  };

  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  const slideShow = [
    cut1,
    cut2,
    cut3,
    cut4,
    cut5,
    cut6,
    cut7,
    cut8,
    cut9,
    cut10,
    cut11,
    cut12,
    cut13,
    cut14,
    cut15,
  ];

  return (
    <Wrapper>
      <Title>
        {language === "en"
          ? "CHECKOUT SOME OF OUR CUTS"
          : "DÉCOUVREZ QUELQUES COUPES"}
      </Title>
      <ButtonSlideWrap>
        <SlideLeft onClick={handlePrevSlide} />
        <SlideShowContainer>
          <SlideShow $currentSlide={currentSlide}>
            {slideShow.map((slide, index) => (
              <StyledImg
                key={index}
                src={slide}
                alt={`Slide ${index + 1}`}
                onClick={() => handleImageClick(slide)}
              />
            ))}
          </SlideShow>
        </SlideShowContainer>
        <SlideRight onClick={handleNextSlide} />
      </ButtonSlideWrap>
      {fullscreenImage && (
        <FullscreenWrapper onClick={handleCloseFullscreen}>
          {isMobile && <CloseButton onClick={handleCloseFullscreen} />}
          <FullscreenImage src={fullscreenImage} alt="Fullscreen view" />
        </FullscreenWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SlideLeft = styled(FaChevronLeft)`
  font-size: 2.5rem;
  color: #eeebde;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
    scale: 1.1;
  }
  &:active {
    scale: 0.9;
  }
`;

const SlideRight = styled(FaChevronRight)`
  color: #eeebde;
  font-size: 2.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
  &:active {
    scale: 0.9;
  }
`;

const ButtonSlideWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  color: whitesmoke;
  text-decoration: underline;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: unset;
`;

const SlideShowContainer = styled.div`
  width: 50vw;
  overflow: hidden;
`;

const SlideShow = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  justify-content: flex-start;
  padding-left: 2.5%;
  gap: 5%;
  transform: ${({ $currentSlide }) => `translateX(-${$currentSlide * 25}%)`};
`;

const StyledImg = styled.img`
  width: 10vw;
  object-fit: cover;
  cursor: pointer;
`;

const FullscreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const FullscreenImage = styled.img`
  height: 90%;
  animation: ${scaleUp} 0.5s ease-in-out;
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 10vh;
  right: 20vw;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

export default PreviousLooks;
