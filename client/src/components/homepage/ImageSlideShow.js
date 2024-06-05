import React, { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MiddleStylish from "./MiddleStylish";
import { useNavigate } from "react-router-dom";
import Loader from "../float-fixed/Loader";
import Header from "../Header";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
import { TextContext } from "../contexts/TextContext";
const ImageSlideShow = () => {
  const [imagePos, setImagePos] = useState(0);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const [slideShowImages, setSlideShowImages] = useState(null);
  const { text } = useContext(TextContext);
  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getSlideShowImages")
      .then((res) => res.json())
      .then((data) => {
        setSlideShowImages(data.data);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImagePos((prev) =>
        prev === -((slideShowImages.length - 1) * 100) ? 0 : prev - 100
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [slideShowImages.length]);
  const handleSlideRight = () => {
    if (imagePos !== -((slideShowImages.length - 1) * 100)) {
      setImagePos((prev) => prev - 100);
    } else {
      setImagePos((prev) => prev + (slideShowImages.length - 1) * 100);
    }
  };

  const handleSlideLeft = () => {
    if (imagePos !== 0) {
      setImagePos((prev) => prev + 100);
    } else {
      setImagePos((prev) => prev - (slideShowImages.length - 1) * 100);
    }
  };
  const homepageText = text.filter((item) => item._id === "homepage");
  if (!slideShowImages || !homepageText) {
    return <Loader />;
  }
  return (
    <Wrapper className="snap-element" $isMobile={isMobile}>
      {isMobile && <Header isShowing={true} />}
      <BackgroundFilter $isMobile={isMobile} />
      <OtherWrapper>
        <MiddleStylish homepageText={homepageText} />
        <BookButton onClick={() => navigate("/book")}>
          {language === "en" ? "Book Now!" : "Reserver Ici!"}
        </BookButton>
        <StyledLeftButton onClick={() => handleSlideLeft()}>
          <AiOutlineLeft />
        </StyledLeftButton>
        <StyledRightButton onClick={() => handleSlideRight()}>
          <AiOutlineRight />
        </StyledRightButton>
        <ImageContainer imagepos={imagePos} $isMobile={isMobile}>
          {slideShowImages.map((image) => {
            return (
              <StyledImage
                key={image._id}
                src={image.src}
                alt={"slideshow image" + image._id}
              />
            );
          })}
        </ImageContainer>
      </OtherWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(3, 43, 30, 0.45);
  scroll-snap-align: ${(props) => (props.$isMobile ? "start" : "none")};
  z-index: 1;
`;
const OtherWrapper = styled.div`
  height: 90vh;
  width: 100%;
  position: relative;
`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 90vh;
  background-color: rgba(3, 43, 30, 0.45);
  z-index: 1;
  position: absolute;
  top: 10vh;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  left: ${(props) => props.imagepos}vw;
  height: 90vh;
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
  top: 75%;
  left: 50%;
  width: 50vw;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #035e3f;
  color: whitesmoke;
  font-size: 1.4rem;
  padding: 10px 0;
  border-radius: 20px;
  border: 3px solid #002b1c;
  font-family: sans-serif;
`;
const StyledLeftButton = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
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
  right: 0;
  transform: translateY(-50%) scaleY(1.7) scaleX(1.1);
  z-index: 1000;
  font-size: 3rem;
  background-color: transparent;
  border: none;
  color: whitesmoke;
  z-index: 1001;
`;

export default ImageSlideShow;
