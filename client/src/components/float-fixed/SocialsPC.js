import { SiInstagram } from "react-icons/si";
import { ImFacebook2 } from "react-icons/im";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { TimelineLite } from "gsap";
import { useEffect, useRef } from "react";
const SocialsPC = () => {
  const location = useLocation();
  let fbRef = useRef(null);
  let instaRef = useRef(null);
  useEffect(() => {
    const tl = new TimelineLite();
    tl.fromTo(
      fbRef,
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 1.2,
      }
    ).fromTo(
      instaRef,
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: -0.2,
      }
    );
  }, []);
  return (
    <Wrapper>
      <SocialMediaLink $location={location.pathname} ref={(el) => (fbRef = el)}>
        <a
          href="https://www.facebook.com/profile.php?id=100095015610230"
          style={{ all: "unset" }}
          aria-label="facebook link"
        >
          <ImFacebook2 />
        </a>
      </SocialMediaLink>
      <SocialMediaLink
        $location={location.pathname}
        ref={(el) => (instaRef = el)}
      >
        <a
          href="https://instagram.com/hollywood.barbers?igshid=MjEwN2IyYWYwYw=="
          style={{ all: "unset" }}
          aria-label="instagram link"
        >
          <SiInstagram />
        </a>
      </SocialMediaLink>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  z-index: 100;
  height: 50%;
  gap: 0.5vw;
`;
const SocialMediaLink = styled.div`
  font-size: 1.3rem;
  color: ${(props) => (props.$location === "/" ? "whitesmoke" : "#006044")};
  margin: 0 0.5rem;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  &:hover {
    scale: 1.1;
    border-bottom: ${(props) =>
      props.$location === "/" ? "2px solid whitesmoke" : "2px solid #006044"};
  }
`;
export default SocialsPC;
