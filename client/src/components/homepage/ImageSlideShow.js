import React, { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MiddleStylish from "./MiddleStylish";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../contexts/ImageContext";
import Loader from "../float-fixed/Loader";
import Header from "../Header";
import { LanguageContext } from "../contexts/LanguageContext";
const ImageSlideShow = () => {
  const [imagePos, setImagePos] = useState(0);
  const navigate = useNavigate();
  const { images } = useContext(ImageContext);
  const { language } = useContext(LanguageContext);
  const slideImages = images.filter((image) => image.filename === "slideShow");
  useEffect(() => {
    const interval = setInterval(() => {
      setImagePos((prev) => (prev === -400 ? 0 : prev - 100));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleSlideRight = () => {
    if (imagePos !== -400) {
      setImagePos((prev) => prev - 100);
    } else {
      setImagePos((prev) => prev + 400);
    }
  };

  const handleSlideLeft = () => {
    if (imagePos !== 0) {
      setImagePos((prev) => prev + 100);
    } else {
      setImagePos((prev) => prev - 400);
    }
  };
  if (!images) return <Loader />;
  return (
    <Wrapper className="snap-element">
      <Header isShowing={true} />
      <BackgroundFilter />
      <OtherWrapper>
        <MiddleStylish />
        <BookButton onClick={() => navigate("/book")}>
          {language === "en" ? "Book Now!" : "Reservez Ici!"}
        </BookButton>
        <StyledLeftButton onClick={() => handleSlideLeft()}>
          <AiOutlineLeft />
        </StyledLeftButton>
        <StyledRightButton onClick={() => handleSlideRight()}>
          <AiOutlineRight />
        </StyledRightButton>
        <ImageContainer imagepos={imagePos}>
          {slideImages.map((image) => {
            return (
              <StyledImage
                key={image._id}
                src={image.src}
                alt={"slide" + image._id}
              />
            );
          })}
        </ImageContainer>
      </OtherWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(3, 43, 30, 0.45);
  scroll-snap-align: start;
`;
const OtherWrapper = styled.div`
  height: 84vh;
  position: relative;
`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 84vh;
  background-color: rgba(3, 43, 30, 0.45);
  z-index: 1;
  position: absolute;
  top: 17vh;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  left: ${(props) => props.imagepos}vw;
  height: 85vh;
  position: relative;
  transition: 0.5s ease-in-out;
`;

const StyledImage = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
`;

const BookButton = styled.button`
  position: absolute;
  top: 80%;
  left: 50%;
  width: 76vw;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #035e3f;
  color: whitesmoke;
  font-size: 1.4rem;
  padding: 20px 0 20px 0;
  border-radius: 20px;
  border: 3px solid #002b1c;
  font-family: sans-serif;
`;
const StyledLeftButton = styled.button`
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%) scaleY(1.7) scaleX(1.1);
  z-index: 100;
  font-size: 3rem;
  background-color: transparent;
  border: none;
  color: whitesmoke;
  z-index: 1001;
`;
const StyledRightButton = styled.button`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%) scaleY(1.7) scaleX(1.1);
  z-index: 100;
  font-size: 3rem;
  background-color: transparent;
  border: none;
  color: whitesmoke;
  z-index: 1001;
`;

export default ImageSlideShow;
