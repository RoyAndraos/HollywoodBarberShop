import headerLogo from "../../assets/headerLogo.svg";
import oneServiceImage from "../../assets/mobileSize1.jpg";
import twoServiceImage from "../../assets/mobileSize2.jpg";
import threeServiceImage from "../../assets/mobileSize3.jpg";
import fourServiceImage from "../../assets/mobileSize4.jpg";
import fiveServiceImage from "../../assets/mobileSize5.jpg";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../contexts/LanguageContext";
const ServiceHeader = () => {
  const { language } = useContext(LanguageContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideShow = [
    oneServiceImage,
    twoServiceImage,
    threeServiceImage,
    fourServiceImage,
    fiveServiceImage,
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slideShow.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [slideShow.length]);
  return (
    <Wrapper>
      <Logo src={headerLogo} alt="hollywood barber shop logo" />
      <SlideShow>
        <SlideContainer $currentSlide={currentSlide}>
          {slideShow.map((src, index) => (
            <StyledImg src={src} alt="barber shop image" key={index} />
          ))}
        </SlideContainer>
      </SlideShow>

      <Title>{language === "en" ? "OUR SERVICES" : "NOS SERVICES"}</Title>
    </Wrapper>
  );
};
const Title = styled.h1`
  font-size: 0.9rem;
  font-weight: unset;
  color: whitesmoke;
  position: absolute;
  width: 10%;
  text-decoration: underline;
  bottom: 0;
  margin: 0;
  padding: 0;
  left: 0;
`;
const Wrapper = styled.div`
  display: flex;
  padding-top: 5vh;
  align-items: flex-start;
  justify-content: center;
  gap: 5vw;
  position: relative;
`;
const Logo = styled.img`
  width: 30vw;
`;

const SlideShow = styled.div`
  display: flex;
  width: 50vw;
  height: 50vw;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ $currentSlide }) => `translateX(-${$currentSlide * 50}vw)`};
`;

const StyledImg = styled.img`
  width: 50vw;
  flex-shrink: 0;
  object-fit: cover;
  flex-grow: 1;
  image-rendering: auto;
  image-rendering: -moz-crisp-edges; /* Firefox        */
  image-rendering: -o-crisp-edges; /* Opera          */
  image-rendering: -webkit-optimize-contrast; /* Safari         */
  image-rendering: optimize-contrast; /* CSS3 Proposed  */
  -ms-interpolation-mode: nearest-neighbor; /* IE8+           */
`;

export default ServiceHeader;
