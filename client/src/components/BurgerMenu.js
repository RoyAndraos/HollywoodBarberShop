import React, { useState } from "react";
import styled from "styled-components";

const BurgerMenu = ({ isOpen, setIsOpen }) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <BurgerContainer onClick={toggleMenu}>
      <BurgerBar isOpen={isOpen} style={{ width: "70%", left: "20%" }} />
      <BurgerBar isOpen={isOpen} />
      <BurgerBar isOpen={isOpen} style={{ width: "70%", left: "20%" }} />
    </BurgerContainer>
  );
};

const BurgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  margin-right: 15px;
  margin-bottom: 15px;

  cursor: pointer;
`;

const BurgerBar = styled.div`
  position: relative;
  width: 100%;
  height: 3px;
  background-color: #cddfd9;
  border-radius: 10px;
  transition: transform 0.3s ease;

  ${({ isOpen }) =>
    isOpen &&
    `
    &:first-child {
      transform: translateX(-7px) translateY(8px) rotate(45deg);
    }

    &:nth-child(2) {
       opacity: 0;
    }

    &:last-child {
       transform: translateX(-7px) translateY(-9px) rotate(-45deg);
    }
  `}
`;

export default BurgerMenu;
