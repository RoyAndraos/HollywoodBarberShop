import React, { useState } from "react";
import { styled, keyframes } from "styled-components";
import { ImLocation2 } from "react-icons/im";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { BsGlobe2 } from "react-icons/bs";
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
          <MdKeyboardArrowLeft
            style={{
              fontSize: "50px",
              color: "whitesmoke",
              left: "-50%",
              position: "relative",
            }}
          />
        ) : (
          <BsGlobe2
            style={{
              fontSize: "30px",
              position: "relative",
              left: "50%",
              color: "whitesmoke",
              backgroundColor: "transparent",
              textShadow: "0 10px 6px -6px black",
              zIndex: 1000,
            }}
          />
        )}
      </ToggleIcon>

      <SocialMediaLinksWrapper isopen={isOpen}>
        <SocialMediaLink>
          <StyledLink
            href="https://instagram.com/hollywood.barbers?igshid=MjEwN2IyYWYwYw=="
            key={"instagramLink"}
          >
            <AiFillInstagram
              style={{
                fontSize: "48px",
              }}
            />
          </StyledLink>
        </SocialMediaLink>
        <SocialMediaLink>
          <StyledLink
            href="https://www.facebook.com/profile.php?id=100095015610230"
            key={"facebookLink"}
          >
            <BsFacebook
              style={{
                fontSize: "38px",
              }}
            />
          </StyledLink>
        </SocialMediaLink>
        <SocialMediaLink>
          <StyledLink href={shopLocationURL}>
            <ImLocation2
              style={{
                fontSize: "40px",
              }}
            />
          </StyledLink>
        </SocialMediaLink>
        <SocialMediaLink>
          <StyledButton as="a" href="tel:+14389237297" key={"phoneLink"}>
            <AiFillPhone
              style={{
                fontSize: "42px",
              }}
            />
          </StyledButton>
        </SocialMediaLink>
      </SocialMediaLinksWrapper>
    </Wrapper>
  );
};

const slideIn = keyframes`
  0% {

    transform: translateX(-100%);
  }

  100% {

    transform: translateX(0);
  }
`;
const slideOut = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  position: fixed;
  top: 5%;
  z-index: 10;
`;

const ToggleIcon = styled.div`
  width: 20%;
  text-align: center;
  margin-left: 10px;
`;

const SocialMediaLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  left: ${(props) => (props.isopen === "true" ? "-20%" : "-100%")};
  animation: ${(props) => (props.isopen ? slideIn : slideOut)} 0.5s ease-in-out;
  background-color: transparent;
  transition: all 0.3s ease-in-out;
  position: relative;
  top: 15vh;
`;

const SocialMediaLink = styled.div`
  margin-bottom: 5px;
  width: 50px;
  text-align: center;
`;

const StyledButton = styled.button`
  background-color: transparent;
  color: whitesmoke;
`;

const StyledLink = styled.a`
  color: whitesmoke;
`;
export default Footer;
