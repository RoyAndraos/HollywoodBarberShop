import styled from "styled-components";
import { useContext, useEffect, useRef } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import { TimelineLite } from "gsap";
const NavBarPC = ({ isSelected, setIsSelected }) => {
  const navigate = useNavigate();
  let ourServicesRef = useRef(null);
  let ourTeamRef = useRef(null);
  let aboutRef = useRef(null);
  let languageRef = useRef(null);
  let wrapper = useRef(null);
  const location = useLocation();
  const { language, setLanguage } = useContext(LanguageContext);
  // animate navbar on load, and stagger between each
  useEffect(() => {
    const tl = new TimelineLite();
    tl.to(wrapper, 0, { css: { visibility: "visible" } })
      .fromTo(
        ourServicesRef,
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.3,
        }
      )
      .fromTo(
        ourTeamRef,
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
      )
      .fromTo(
        aboutRef,
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
      )
      .fromTo(
        languageRef,
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
    <Wrapper ref={(el) => (wrapper = el)}>
      <NavButton
        onClick={() => {
          setIsSelected("menu");
          navigate("/ourServices");
        }}
        ref={(el) => (ourServicesRef = el)}
        $isselected={isSelected === "menu" ? true : false}
        $location={location.pathname}
      >
        {language === "en" ? "Our Services" : "Nos Services"}
      </NavButton>
      <NavButton
        ref={(el) => (ourTeamRef = el)}
        onClick={() => {
          setIsSelected("barbers");
          navigate("/ourTeam");
        }}
        $isselected={isSelected === "barbers" ? true : false}
        $location={location.pathname}
      >
        {language === "en" ? "Our Team" : "Notre Equipe"}
      </NavButton>
      <NavButton
        ref={(el) => (aboutRef = el)}
        onClick={() => {
          setIsSelected("about");
          navigate("/about");
        }}
        $location={location.pathname}
        $isselected={isSelected === "about" ? true : false}
      >
        {language === "en" ? "About Us" : "A Propos"}
      </NavButton>
      <NavButton
        ref={(el) => (languageRef = el)}
        onClick={() => {
          setLanguage(language === "en" ? "fr" : "en");
        }}
        $location={location.pathname}
      >
        Fr/En
      </NavButton>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  visibility: hidden;
  justify-content: center;
  align-items: center;
  gap: 1vw;
  height: 100%;
  padding-right: 1vw;
`;
const NavButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => {
    if (props.$isselected) {
      return "black";
    } else if (props.$location === "/") {
      return "whitesmoke";
    } else {
      return "#006044";
    }
  }};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-bottom: ${(props) =>
    props.$isselected ? "2px solid black" : "2px solid transparent"};
  height: 99%;
  position: relative;
  &:hover {
    opacity: 0.8;
    border-bottom: ${(props) =>
      props.$location === "/" ? "2px solid whitesmoke" : "2px solid #006044"};
  }
  outline: none;
`;
export default NavBarPC;
