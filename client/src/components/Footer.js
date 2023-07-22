import React, { useState } from "react";
import { styled } from "styled-components";
import { ImLocation2 } from "react-icons/im";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const address =
    "Hollywood fairmount salon de barbier, 18 Av. Fairmount O, Montreal, Quebec H2T 2M1";
  const shopLocationURL = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}`;

  const handleToggleOpen = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <Wrapper>
      <ToggleIcon onClick={handleToggleOpen}>
        {isOpen ? (
          <MdKeyboardArrowLeft style={{ fontSize: "50px", color: "white" }} />
        ) : (
          <IoShareSocialSharp style={{ fontSize: "30px", color: "white" }} />
        )}
      </ToggleIcon>
      <SocialMediaLinksWrapper isOpen={isOpen}>
        <SocialMediaLink>
          <a href="https://www.instagram.com/hollywoodcutsbarbershop/">
            <img src="/assets/instagramLogo.png" alt="Instagram Logo" />
          </a>
        </SocialMediaLink>
        <SocialMediaLink>
          <a href="https://www.facebook.com/hollywoodcutsbarbershop/">
            <img src="/assets/facebookLogo.png" alt="Facebook Logo" />
          </a>
        </SocialMediaLink>
        <SocialMediaLink>
          <a href={shopLocationURL}>
            <ImLocation2 style={{ fontSize: "24px", fill: "#bb0000" }} />
          </a>
        </SocialMediaLink>
      </SocialMediaLinksWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 10vh;
  width: 90%;
  position: absolute;
  bottom: 0;
  left: 0.5%;

  z-index: 100;
  transition: left 0.3s ease;
  left: 0.5%;
`;

const ToggleIcon = styled.div`
  width: 20%;
  text-align: center;
`;

const SocialMediaLinksWrapper = styled.div`
  width: 100%;
  display: flex;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  background-color: ${(props) =>
    props.isOpen ? "rgba(255,255,255,0.6)" : "transparent"};
  padding: 10px 0 10px 0;
  border-radius: 10px;
  transition: opacity 0.3s ease;
`;

const SocialMediaLink = styled.div`
  width: 33.33%;
  text-align: center;
`;

export default Footer;
