import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
const NavBarPC = ({
  menuRef,
  barbersRef,
  aboutRef,
  slideshowRef,
  scrollToRef,
}) => {
  const [isSelected, setIsSelected] = useState("");
  const { language, setLanguage } = useContext(LanguageContext);
  const handleSelect = (name) => {
    setIsSelected(name);
  };
  useEffect(() => {
    if (
      !menuRef.current ||
      !barbersRef.current ||
      !aboutRef.current ||
      !slideshowRef.current
    )
      return;
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the target is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetRef = entry.target;
          const targetId = targetRef.id;

          setIsSelected(targetId.split("-")[0]);
        }
      });
    }, observerOptions);

    // Observe the target elements
    observer.observe(menuRef.current);
    observer.observe(barbersRef.current);
    observer.observe(aboutRef.current);
    observer.observe(slideshowRef.current);

    // Cleanup function to disconnect the observer
    return () => {
      observer.disconnect();
    };
  }, [menuRef, barbersRef, aboutRef, slideshowRef]);
  return (
    <Wrapper>
      <NavButton
        onClick={() => {
          scrollToRef(menuRef);
          handleSelect("menu");
        }}
        $isselected={isSelected === "menu" ? true : false}
      >
        Prices
      </NavButton>
      <NavButton
        onClick={() => {
          scrollToRef(barbersRef);
          handleSelect("barbers");
        }}
        $isselected={isSelected === "barbers" ? true : false}
      >
        {language === "en" ? "Barbers" : "Coiffeurs"}
      </NavButton>
      <NavButton
        onClick={() => {
          scrollToRef(aboutRef);
          handleSelect("about");
        }}
        $isselected={isSelected === "about" ? true : false}
      >
        {language === "en" ? "About Us" : "A propos"}
      </NavButton>
      <NavButton
        onClick={() => {
          setLanguage(language === "en" ? "fr" : "en");
        }}
      >
        Fr | En
      </NavButton>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1.5vw;
  height: 100%;
  padding-right: 1vw;
`;
const NavButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => (props.$isselected ? "#e7e7b0" : "whitesmoke")};
  font-size: clamp(1rem, 1.2rem, 1.4rem);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-bottom: ${(props) =>
    props.$isselected ? "2px solid #e7e7b0" : "2px solid transparent"};
  height: 99%;

  &:hover {
    opacity: 0.8;
    border-bottom: 2px solid rgba(255, 255, 255, 0.7);
  }
  outline: none;
`;
export default NavBarPC;
