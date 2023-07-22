import React from "react";
import { styled } from "styled-components";
import {ImLocation2}  from "react-icons/im";
const Footer = () => {
  return (
    <Wrapper>
      <LinkWrapper>
        <a href="https://www.instagram.com/hollywoodcutsbarbershop/">
          <img src="/assets/instagramLogo.png" alt="Instagram Logo" />
        </a>
      </LinkWrapper>

      <LinkWrapper>
        <a href="https://www.facebook.com/hollywoodcutsbarbershop/">
          <img src="/assets/facebookLogo.png" alt="Facebook Logo" />
        </a>
      </LinkWrapper>
      <LinkWrapper>
        <ImLocation2  style={{fontSize: "23px", fill: "#bb0000"}}/>
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
  background-color: white;
`;

const LinkWrapper = styled.div`
  width: 20%;
  text-align: center;
  back
`;

export default Footer;
