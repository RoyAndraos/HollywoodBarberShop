import React from "react";
import { styled } from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <LinkWrapper>
        <span>About</span>
      </LinkWrapper>
      <LinkWrapper>
        <span>Contact</span>
      </LinkWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 10vh;
  border-top: 2px solid grey;
  width: 90%;
  position: fixed;
  bottom: 0;
  left: 5%;
`;

const LinkWrapper = styled.div`
  width: 20%;
  text-align: center;
`;

export default Footer;
