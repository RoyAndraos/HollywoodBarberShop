import styled from "styled-components";
import { useContext, useState } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
const NavBarPC = ({ headerHeight, isSelected, setIsSelected }) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <Wrapper>
      <NavButton
        onClick={() => {
          setIsSelected("menu");
          navigate("/ourServices");
        }}
        $headerHeight={headerHeight}
        $isselected={isSelected === "menu" ? true : false}
      >
        {language === "en" ? "Prices" : "Prix"}
      </NavButton>
      <NavButton
        onClick={() => {
          setIsSelected("barbers");
          navigate("/ourTeam");
        }}
        $headerHeight={headerHeight}
        $isselected={isSelected === "barbers" ? true : false}
      >
        {language === "en" ? "Barbers" : "Coiffeurs"}
      </NavButton>
      <NavButton
        onClick={() => {
          setIsSelected("about");
          navigate("/about");
        }}
        $headerHeight={headerHeight}
        $isselected={isSelected === "about" ? true : false}
      >
        {language === "en" ? "About Us" : "A propos"}
      </NavButton>
      <NavButton
        onClick={() => {
          setLanguage(language === "en" ? "fr" : "en");
        }}
        $headerHeight={headerHeight}
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
  font-size: ${(props) => (props.$headerHeight === "4vh" ? "1rem" : "1.2rem")};
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
