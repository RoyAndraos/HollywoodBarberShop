import React, { useState } from "react";
import { styled } from "styled-components";
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
          <MdKeyboardArrowLeft style={{ fontSize: "50px", color: "white" }} />
        ) : (
          <div style={{ position: "relative" }}>
            <BsGlobe2
              style={{
                fontSize: "30px",
                color: "whitesmoke",
                backgroundColor: "transparent",
                borderRadius: "5px",
                textShadow: "0 10px 6px -6px black",
                zIndex: 1000,
              }}
            />
          </div>
        )}
      </ToggleIcon>
      {isOpen === "true" ? (
        <SocialMediaLinksWrapper isopen={isOpen}>
          <SocialMediaLink>
            <StyledLink
              href="https://instagram.com/hollywood.barbers?igshid=MjEwN2IyYWYwYw=="
              key={"instagramLink"}
            >
              <AiFillInstagram
                style={{
                  fontSize: "48px",
                  fill: "whitesmoke",
                  padding: "3px",
                  borderRadius: "5px",
                }}
              />
            </StyledLink>
          </SocialMediaLink>
          <SocialMediaLink>
            <StyledLink
              href="https://www.facebook.com/hollywoodcutsbarbershop/"
              key={"facebookLink"}
            >
              <BsFacebook
                style={{
                  fontSize: "38px",
                  fill: "whitesmoke",
                  padding: "3px",
                  borderRadius: "5px",
                }}
              />
            </StyledLink>
          </SocialMediaLink>
          <SocialMediaLink>
            <a href={shopLocationURL}>
              <ImLocation2
                style={{
                  fontSize: "40px",
                  fill: "whitesmoke",
                  padding: "3px",
                  borderRadius: "5px",
                  transform: "scaleX(1.1)",
                }}
              />
            </a>
          </SocialMediaLink>
          <SocialMediaLink>
            <StyledButton as="a" href="tel:+14389237297" key={"phoneLink"}>
              <AiFillPhone
                style={{
                  fontSize: "45px",
                  transform: "scaleX(0.95)",
                  fill: "whitesmoke",
                  padding: "3px",
                  borderRadius: "5px",
                }}
              />
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
  height: 30px;
  width: 90%;
  position: fixed;
  top: 4.2%;
  left: 35px;
  transition: left 0.3s ease;
  left: 0.5%;
  z-index: 1;
`;

const ToggleIcon = styled.div`
  width: 20%;
  text-align: center;
  margin-left: 10px;
`;

const SocialMediaLinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.isopen === "true" ? 1 : 0)};
  background-color: transparent;
  padding: 10px 0 10px 0;
  border-radius: 10px;
  transition: opacity 0.3s ease;
  position: relative;
  left: -22%;
  top: 24.2vh;
`;

const SocialMediaLink = styled.div`
  width: 33.33%;
  text-align: center;
  margin-bottom: 5px;
`;

const StyledButton = styled.button`
  background-color: transparent;
  width: 100%;
  height: 30px;
`;

const StyledLink = styled.a`
  width: 100%;
  height: 40px;
`;
export default Footer;
