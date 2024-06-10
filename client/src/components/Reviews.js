import { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "./contexts/LanguageContext";
import arrowleft from "../assets/ARROW LEFT (GREEN).svg";
import arrowright from "../assets/ARROW RIGHT (GREEN).svg";
import { TimelineLite } from "gsap";
import { reviews } from "./helpers";

const Reviews = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  let reviewRef = useRef(null);
  let starsRef = useRef(null);
  let textRef = useRef(null);
  useEffect(() => {
    const tl = new TimelineLite();
    tl.to(reviewRef, 0, { css: { visibility: "visible" } }).fromTo(
      reviewRef,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
      }
    );
  }, []);

  const handleNextReview = () => {
    const tl = new TimelineLite();
    tl.to([starsRef, textRef], 0.5, {
      x: "-100%",
      opacity: 0,
      onComplete: () => {
        setCurrentReviewIndex((prevIndex) =>
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
        tl.fromTo(
          [starsRef, textRef],
          { x: "100%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 0.5 }
        );
      },
    });
  };

  const handlePreviousReview = () => {
    const tl = new TimelineLite();
    tl.to([starsRef, textRef], 0.5, {
      x: "100%",
      opacity: 0,
      onComplete: () => {
        setCurrentReviewIndex((prevIndex) =>
          prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
        tl.fromTo(
          [starsRef, textRef],
          { x: "-100%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 0.5 }
        );
      },
    });
  };

  return (
    <ReviewWrapper ref={(el) => (reviewRef = el)}>
      <ReviewSlideShow>
        <Review>
          <StarsWrapper ref={(el) => (starsRef = el)}>
            <Name>{reviews[currentReviewIndex].name}</Name>
            {[...Array(reviews[currentReviewIndex].stars)].map(
              (star, index) => {
                return <IoStar key={index} />;
              }
            )}
          </StarsWrapper>
          <ReviewText
            ref={(el) => (textRef = el)}
            dangerouslySetInnerHTML={{
              __html: reviews[currentReviewIndex].review,
            }}
          ></ReviewText>
        </Review>
      </ReviewSlideShow>
      <ArrowLeft onClick={handlePreviousReview}>
        <img src={arrowleft} alt="arrow pointing left" />
      </ArrowLeft>
      <ArrowRight onClick={handleNextReview}>
        <img src={arrowright} alt="arrow pointing right" />
      </ArrowRight>
      <BookButton onClick={() => navigate("/book")}>
        {language === "en" ? "BOOK NOW!" : "RESERVER"}
      </BookButton>
    </ReviewWrapper>
  );
};

const Name = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #001c00;
  margin-right: 1rem;
`;
const Review = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 1rem;
  align-items: flex-start;
  color: #006044;
  overflow: hidden;
`;
const ReviewText = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  line-height: 1.5;
`;
const ArrowLeft = styled.div`
  position: absolute;
  top: 60%;
  left: -6%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  img {
    width: 100%;
    height: auto;
    transition: all 0.2s ease-in-out;
  }
  img:hover {
    opacity: 0.7;
  }
`;

const ArrowRight = styled.div`
  position: absolute;
  top: 60%;
  z-index: 1000;
  right: -6%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    width: 100%;
    height: auto;
    transition: all 0.2s ease-in-out;
  }
  img:hover {
    opacity: 0.7;
  }
`;
export const BookButton = styled.button`
  height: auto;
  background: linear-gradient(90deg, #035e3f 50%, black 50%);
  background-size: 200% 100%;
  background-position: 0% 50%;
  color: whitesmoke;
  font-size: clamp(1rem, 1.5vw, 1.6rem);
  cursor: pointer;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%, 0 100%);
  transition: background-position 0.3s ease-in-out, clip-path 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: normal;
  font-weight: 400;
  padding: 9px 25px;
  border: none;
  position: relative;
  border-radius: 15px;
  margin-top: 1rem;
  margin-bottom: 2rem;
  &:hover {
    background-position: 100% 50%;
    clip-path: polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%);
    transform: translateX(-10px);
  }
  &:active {
    transform: translateX(0px);
  }
  &:disabled {
    background: #999;
    &:hover {
      background: #999;
      transform: translateX(0px);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%, 0 100%);
    }
  }
`;
const ReviewWrapper = styled.div`
  position: absolute;
  background-color: #efede0;
  width: 45%;
  height: 25vh;
  left: 50%;
  top: 70vh;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  border-radius: 35px;
  visibility: hidden;
`;
const StarsWrapper = styled.div`
  color: #dfc844;
  font-size: 1.3rem;
`;
const ReviewSlideShow = styled.div`
  width: 80%;
  height: 60%;
`;
export default Reviews;
