import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Reviews from "./Reviews";
import bgSrc from ".././assets/homepagebg.webp";
import FooterPc from "./FooterPc";
import logoHomeCenter from "../assets/logoHomeCenter.svg";
import { TimelineLite } from "gsap";
const PCHomePage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  let coverRef = useRef(null);
  let midLogoRef = useRef(null);

  useEffect(() => {
    const tl = new TimelineLite();
    if (imageLoaded) {
      tl.to(coverRef, { height: 0, duration: 0.8, delay: 1 });
      tl.fromTo(
        midLogoRef,
        {
          opacity: 0,
          y: -10,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
        }
      );
    }
  }, [imageLoaded]);

  return (
    <Wrapper>
      <StyledImage
        src={bgSrc}
        onLoad={() => setImageLoaded(true)}
        alt="counter with plants and a business card"
      />
      <StyledLogo
        src={logoHomeCenter}
        alt="logo"
        ref={(el) => (midLogoRef = el)}
      />
      <Filter />
      <Cover ref={(el) => (coverRef = el)} />
      <Reviews />
      <FooterPc />
    </Wrapper>
  );
};

const Filter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const StyledLogo = styled.img`
  position: absolute;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  width: 20%;
  z-index: 1;
`;
const Wrapper = styled.div`
  position: relative;
  top: 8vh;
  height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledImage = styled.img`
  height: 70vh;
  object-fit: cover;
  width: 100%;
`;

const Cover = styled.div`
  position: absolute;
  bottom: 22vh;
  left: 0;
  width: 100%;
  height: 70vh;
  background-color: #eeebde;
  z-index: 2;
`;

export default PCHomePage;
