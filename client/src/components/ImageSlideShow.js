import React, { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MiddleStylish from "./MiddleStylish";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "./contexts/ImageContext";
const ImageSlideShow = () => {
  const [imagePos, setImagePos] = useState(0);
  const navigate = useNavigate();
  const { images } = useContext(ImageContext);
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

  return (
    <Wrapper>
      <MiddleStylish />
      <BookButton onClick={() => navigate("/book")}>Book Now!</BookButton>
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
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100vw;
  height: calc(85.7vh + 6px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #011c13;
  z-index: 0;
  border-bottom: 5px solid #011c13;
  padding-top: 3px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  left: ${(props) => props.imagepos}vw;
  height: 100%;
  border-radius: 10px;
  z-index: 1;
  position: relative;
  transition: 0.5s ease-in-out;
`;

const StyledImage = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
  border-right: 10px solid #011c13;
  border-left: 10px solid #011c13;
`;

const BookButton = styled.button`
  position: absolute;
  top: 80%;
  left: 50%;
  width: 60vw;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #035e3f;
  color: whitesmoke;
  font-size: 1.8rem;
  padding: 20px 15px;
  border-radius: 30px;
  border: none;
  font-family: sans-serif;
  box-shadow: 5px 5px 5px black;
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
