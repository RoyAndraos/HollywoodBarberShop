import { useState } from "react";
import styled, { keyframes } from "styled-components";
import examplePic from "../assets/hollywoodWebDesign.jpg";
import examplePic2 from "../assets/hollywoodWebDesign1.jpg";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const PreviousLooks = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const handleNextSlide = (e) => {
    e.preventDefault();
    setCurrentSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
  };

  const handlePrevSlide = (e) => {
    e.preventDefault();
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 2 : prevSlide - 1));
  };

  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  const slideShow = [
    examplePic,
    examplePic2,
    examplePic,
    examplePic2,
    examplePic,
    examplePic2,
    examplePic,
    examplePic2,
  ];

  return (
    <Wrapper>
      <Title>CHECKOUT SOME OF OUR CUTS</Title>
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
          <CloseButton onClick={handleCloseFullscreen} />
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
  justify-content: center;
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