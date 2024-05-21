import { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { LanguageContext } from "./contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import Loader from "./float-fixed/Loader";
const MenuPC = () => {
  const { language } = useContext(LanguageContext);
  const [services, setServices] = useState(null);
  const [menuBackground, setMenuBackground] = useState(null);
  const [underMenu, setUnderMenu] = useState(null);

  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getMenu")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setMenuBackground(data.menuBackgroundImage[0]);
        setUnderMenu(data.menuText[0]);
      });
  }, []);

  const navigate = useNavigate();

  if (!services || !menuBackground || !underMenu) {
    return <Loader />;
  }

  return (
    <Wrapper id="menu-section">
      <Title>{language === "en" ? "Our Services" : "Nos Services"}</Title>
      <MenuWrapper className="sibling-fade">
        {services.map((service) => {
          return (
            <Service key={service._id}>
              <ServiceName>
                {language === "fr" ? service.name : service.english}
              </ServiceName>
              <ServicePrice>{service.price}</ServicePrice>
            </Service>
          );
        })}
      </MenuWrapper>
      <Right>
        <Message>
          {language === "en" ? underMenu.content : underMenu.french}
        </Message>
        <BookButton
          onClick={() => {
            navigate("/book");
          }}
        >
          {language === "en" ? "Book Now" : "Reserver"}
        </BookButton>
      </Right>
      <StyledBg />
    </Wrapper>
  );
};

const clockwise = keyframes` 
  0% {
    top: -5px;
    left: 0;
  }
  12% {
    top: -2px;
    left: 2px;
  }
  25% {
    top: 0;
    left: 5px;    
  }
  37% {
    top: 2px;
    left: 2px;
  }
  50% {
    top: 5px;
    left: 0;    
  }
  62% {
    top: 2px;
    left: -2px;
  }
  75% {
    top: 0;
    left: -5px;
  }
  87% {
    top: -2px;
    left: -2px;
  }
  100% {
    top: -5px;
    left: 0;    
  }
`;

const counterclockwise = keyframes` 
  0% {
    top: -5px;
    right: 0;
  }
  12% {
    top: -2px;
    right: 2px;}
  `;

const Right = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 30%;
  place-content: center space-evenly;
  background-color: #011c13;
  scroll-snap-align: start;
  color: white;
  width: 100%;
  height: 92vh;
  top: 8vh;
  position: relative;
  z-index: -3;
`;

const StyledBg = styled.div`
  object-fit: cover;
  clip-path: polygon(46% 5%, 59% 14%, 99% 17%, 95% 85%, 3% 90%, 5% 60%, 4% 9%);
  width: 100%;
  height: 80vh;
  z-index: -2;
  position: absolute;
  background-image: linear-gradient(-20deg, transparent 0%, #035e3f 100%);
  top: 8vh;
`;

const Title = styled.h1`
  font-size: 35px;
  margin: 1rem;
  position: absolute;
  color: rgba(243, 238, 211, 0.9);
  top: 5%;
  right: 15%;
  top: 8vh;
  border-radius: 75px;
  transition: 1s box-shadow;
  margin: 20px auto;
  width: 250px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #011c13;
  cursor: default;
  &:hover {
    box-shadow: 0 5px 35px 0px rgba(0, 0, 0, 0.1);
  }
  &:hover::before,
  &:hover::after {
    display: block;
    content: "";
    position: absolute;
    width: 250px;
    height: 50px;
    background: #035e3f;
    border-radius: 75px;
    z-index: -1;
    animation: 1s ${clockwise} infinite;
  }
  &:hover:after {
    background: transparent;
    animation: 2s ${counterclockwise} infinite;
  }
  @media (max-width: 1000px) {
    font-size: 25px;
  }
`;

const Service = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  display: grid;
  place-content: start;
  grid-template-columns: 70% 30%;
  gap: 1rem;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 1000px) {
    padding: 0.5rem;
  }
`;

const ServiceName = styled.p`
  font-size: 20px;
  color: whitesmoke;
  margin-left: 20%;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;

const ServicePrice = styled.p`
  font-size: 20px;
  margin-left: 20%;
  color: #e7e7b0;
  font-weight: bold;
  z-index: 3;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;

const Message = styled.p`
  font-size: 20px;
  color: #e7e7b0;
  margin-bottom: 1rem;
  z-index: 3;
  text-align: center;
  line-height: 1.5;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 5rem 1rem 5rem 1rem;
  margin-top: 5rem;
  border-radius: 10px;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 3;
  gap: 1rem;
  position: relative;
  top: 8vh;
  visibility: hidden;
  cursor: default;
  > * {
    visibility: visible;
  }

  > * {
    transition: opacity 200ms linear 150ms, transform 200ms ease-in-out 150ms;
  }

  &:hover > * {
    opacity: 0.4;
    transform: scale(0.97);
  }

  > *:hover {
    opacity: 1;
    transform: scale(1);
    transition-delay: 0ms, 0ms;
  }

  @media (max-width: 1000px) {
    gap: 0.5rem;
  }
`;

const BookButton = styled.button`
  height: auto;
  background-color: #035e3f;
  color: whitesmoke;
  font-size: clamp(1rem, 1.5vw, 1.6rem);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-family: "octin-prison", sans-serif;
  font-weight: 900;
  font-style: normal;
  border: none;
  letter-spacing: 2px;
  padding: 15px 30px;
  &:hover {
    transform: scale(1.02);
    background-color: whitesmoke;
    color: #035e3f;
  }
`;

export default MenuPC;
