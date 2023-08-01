import React, { useState } from "react";
import { styled } from "styled-components";
import { ImLocation2 } from "react-icons/im";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import {BsGlobe2} from 'react-icons/bs';
const Footer = () => {
  const [isOpen, setIsOpen] = useState("false");
  const address =
    "Hollywood fairmount salon de barbier, 18 Av. Fairmount O, Montreal, Quebec H2T 2M1";
  const shopLocationURL = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}`;

  const handleToggleOpen = () => {
    if (isOpen === "false") {
      setIsOpen("true");
    } else {
      setIsOpen("false");
    }
  };

  return (
    <Wrapper>
      <ToggleIcon onClick={handleToggleOpen}>
        {isOpen === "true" ? (
          <MdKeyboardArrowLeft style={{ fontSize: "50px", color: "white" }} />
        ) : (
          <BsGlobe2 style={{   border: "1px solid white",fontSize: "30px", color: "white", backgroundColor:"rgba(3,94,63,0.6)", padding: "5px", borderRadius:"5px" }} />
        )}
      </ToggleIcon>
      {isOpen === "true" ? (
        <SocialMediaLinksWrapper isopen={isOpen}>
          <SocialMediaLink>
            <StyledLink
              href="https://instagram.com/hollywood.barbers?igshid=MjEwN2IyYWYwYw=="
              key={"instagramLink"}
            >
              <AiFillInstagram style={{ fontSize: "35px", color: "#035e3f" }} />
            </StyledLink>
          </SocialMediaLink>
          <SocialMediaLink>
            <StyledLink
                href="https://www.facebook.com/hollywoodcutsbarbershop/"
                key={"facebookLink"}
            >
              <BsFacebook style={{ fontSize: "29px", color: "#035e3f" }} />
            </StyledLink>
          </SocialMediaLink>
          <SocialMediaLink>
            <a href={shopLocationURL}>
              <ImLocation2 style={{ fontSize: "27px", fill: "#035e3f" }} />
            </a>
          </SocialMediaLink>
          <SocialMediaLink>
            <StyledButton as="a" href="tel:+14389237297" key={"phoneLink"}>
              <AiFillPhone style={{ fontSize: "30px", fill: "#035e3f" }} />
            </StyledButton>
          </SocialMediaLink>
        </SocialMediaLinksWrapper>
      ) : (
        <SocialMediaLinksWrapper></SocialMediaLinksWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
  width: 90%;
  position: fixed;
  bottom: 0;
  left: 0.5%;
  z-index: 100;
  transition: left 0.3s ease;
  left: 0.5%;
`;

const ToggleIcon = styled.div`
  width: 20%;
  text-align: center;
  margin-left:10px;
`;

const SocialMediaLinksWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.isopen === "true" ? 1 : 0)};
  background-color: ${(props) =>
    props.isopen === "true" ? "whitesmoke" : "transparent"};
  padding: 10px 0 10px 0;
  border-radius: 10px;
  transition: opacity 0.3s ease;
`;

const SocialMediaLink = styled.div`
  width: 33.33%;
  text-align: center;
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  width: 100%;
  height: 40px;
`;

const StyledLink = styled.a`
width: 100%;
height: 40px;
`
export default Footer;
