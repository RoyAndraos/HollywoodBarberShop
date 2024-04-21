import { useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "./contexts/LanguageContext";
import { ServiceContext } from "./contexts/ServiceContext";
import bg from "../assets/MenuPC.jpg";
import { useNavigate } from "react-router-dom";
import { TextContext } from "./contexts/TextContext";
const MenuPC = () => {
  const { services } = useContext(ServiceContext);
  const { language } = useContext(LanguageContext);
  const { text } = useContext(TextContext);
  const underMenu = text.filter((item) => item._id === "underMenu");
  const navigate = useNavigate();
  return (
    <Wrapper id="menu-section">
      <Title>{language === "en" ? "Our Services" : "Nos Services"}</Title>
      <Message>
        {language === "en" ? underMenu[0].content : underMenu[0].french}
      </Message>
      <MenuWrapper>
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
        <BookButton
          onClick={() => {
            navigate("/book");
          }}
        >
          {language === "en" ? "Book Now" : "Reserver"}
        </BookButton>
      </MenuWrapper>
      <StyledBg />
      <Filter />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  color: white;
  width: 100%;
  min-height: 70vh;
  position: relative;
  margin-bottom: 3vh;
`;

const StyledBg = styled.div`
  background-image: url(${bg});
  background-size: cover;
  clip-path: polygon(46% 0, 59% 19%, 99% 23%, 100% 100%, 0 100%, 0% 60%, 0 0);
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 3rem, 3.4rem);
  z-index: 3;
  margin: 1rem;
  position: absolute;
  color: #079061;
  top: 5%;
  right: 15%;
`;
const Service = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 1rem;
  width: 50%;
  border-radius: 10px;
`;
const ServiceName = styled.p`
  font-size: clamp(1.3rem, 1.5rem, 1.8rem);
  color: whitesmoke;
  margin-left: 20%;
`;
const ServicePrice = styled.p`
  font-size: clamp(1.1rem, 1.3rem, 1.6rem);
  margin-left: 20%;
  color: #e7e7b0;
  font-weight: bold;
  z-index: 3;
`;
const Message = styled.p`
  font-size: clamp(1.1rem, 1.3rem, 1.6rem);
  margin-left: 13%;
  color: #e7e7b0;
  margin-bottom: 1rem;
  z-index: 3;
`;
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 3;
  gap: 1rem;
  position: relative;
  left: 15%;
  width: 85%;
`;
const Filter = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(47, 36, 23, 0.5);
  clip-path: polygon(46% 0, 59% 19%, 99% 23%, 100% 100%, 0 100%, 0% 60%, 0 0);
  z-index: 2;
`;
const BookButton = styled.button`
  width: 20%;
  height: auto;
  z-index: 1000;
  background-color: #035e3f;
  color: whitesmoke;
  font-size: clamp(1rem, 1.5vw, 1.6rem);
  padding: 20px 0 20px 0;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-family: "octin-prison", sans-serif;
  font-weight: 900;
  font-style: normal;
  border: none;
  letter-spacing: 2px;
  position: absolute;
  bottom: -25%;
  left: 15%;
  &:hover {
    transform: scale(1.02);
    background-color: whitesmoke;
    color: #035e3f;
  }
`;
export default MenuPC;
