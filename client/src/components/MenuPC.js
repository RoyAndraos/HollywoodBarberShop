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
      </MenuWrapper>
      <Right>
        <Message>
          {language === "en" ? underMenu[0].content : underMenu[0].french}
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
      <Filter />
    </Wrapper>
  );
};

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
  background-color: black;
  scroll-snap-align: start;
  color: white;
  width: 100%;
  min-height: 70vh;
  position: relative;
  margin-bottom: 3vh;
  top: -8vh;
`;

const StyledBg = styled.div`
  background-image: url(${bg});
  background-size: cover;
  clip-path: polygon(46% 0, 59% 14%, 99% 17%, 100% 100%, 0 100%, 0% 60%, 0 0);
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  top: 8vh;
`;

const Title = styled.h1`
  font-size: 35px;
  z-index: 3;
  margin: 1rem;
  position: absolute;
  color: #079061;
  top: 5%;
  right: 15%;
  top: 8vh;

  @media (max-width: 1000px) {
    font-size: 25px;
  }
`;
const Service = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  display: grid;
  place-content: start;
  grid-template-columns: 70% 30%;
  gap: 1rem;
  border-radius: 10px;
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
  background-color: rgba(0, 0, 0, 0.8);
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

  @media (max-width: 1000px) {
    gap: 0.5rem;
  }
`;
const Filter = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(47, 36, 23, 0.9);
  clip-path: polygon(46% 0, 59% 14%, 99% 17%, 100% 100%, 0 100%, 0% 60%, 0 0);
  z-index: 2;
  top: 8vh;
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
