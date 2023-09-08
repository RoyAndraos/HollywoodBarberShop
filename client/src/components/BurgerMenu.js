import React from "react";
import styled from "styled-components";

const BurgerMenu = ({ isopen, setIsOpen }) => {
  const toggleMenu = () => {
    if (isopen === "true") {
      setIsOpen("false");
    } else {
      setIsOpen("true");
    }
  };

  return (
    <div
      style={{
        height: "30px",
        position: "fixed",
        right: "35px",
        top: "5%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <BurgerContainer onClick={toggleMenu}>
        <BurgerBar isopen={isopen} style={{ width: "70%", left: "20%" }} />
        <BurgerBar isopen={isopen} />
        <BurgerBar isopen={isopen} style={{ width: "70%", left: "20%" }} />
      </BurgerContainer>
    </div>
  );
};

const BurgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;

  cursor: pointer;
  z-index: 1000;
`;

const BurgerBar = styled.div`
  position: relative;
  width: 100%;
  height: 3px;
  background-color: #cddfd9;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  &:first-child {
    transition: all 0.3s ease-in-out;
    transform: ${(props) =>
      props.isopen === "true" ? "translateY(9px) rotate(45deg);" : ""};
  }

  &:nth-child(2) {
    transition: all 0.3s ease-in-out;
    opacity: ${(props) => (props.isopen === "true" ? "0" : "1")};
  }

  &:last-child {
    transition: all 0.3s ease-in-out;
    transform: ${(props) =>
      props.isopen === "true" ? "translateY(-8.2px) rotate(-45deg)" : ""};
  }
`;

export default BurgerMenu;
