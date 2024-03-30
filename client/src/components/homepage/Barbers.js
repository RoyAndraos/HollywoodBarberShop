import { useContext } from "react";
import styled from "styled-components";
import { Title, Wrapper, TitleWrapper } from "./Menu";
import { useNavigate } from "react-router-dom";
import { BarberContext } from "../contexts/BarberContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
const Barbers = () => {
  const { barberInfo } = useContext(BarberContext);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  return (
    <Wrapper
      id="barbers-section"
      key={"barbers-section"}
      className="snap-element"
      $isMobile={isMobile}
    >
      <TitleWrapper>
        <Title>{language === "en" ? "Our Team" : "Notre Equipe"}</Title>
      </TitleWrapper>
      {barberInfo.map((barber) => {
        return (
          <BarberWrapper key={barber._id}>
            {barber.picture !== "" && (
              <Avatar src={barber.picture} alt="barber"></Avatar>
            )}
            <BarberTitle>
              {barber.given_name + " " + barber.family_name}
            </BarberTitle>
            <Description> {barber.description}</Description>
            <Book key={barber._id} onClick={() => navigate("/book")}>
              {language === "en" ? "Book" : "Reserver"}
            </Book>
          </BarberWrapper>
        );
      })}
      {barberInfo.length === 1 && <BarberWrapper />}
    </Wrapper>
  );
};

const BarberWrapper = styled.div`
  display: flex;
  height: 45vh;
  width: 70vw;
  font-size: 1.2rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: #035e3f;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  &:last-of-type {
    border-bottom: none;
  }
`;
const Avatar = styled.img`
  width: 200px;
  border-radius: 10%;
`;
const Description = styled.p`
  font-size: 1rem;
  font-family: "poppins", sans-serif;
  line-height: 1.2;
  letter-spacing: 0.1rem;
  color: whitesmoke;
  margin-top: 10px;
`;
const Book = styled.button`
  font-family: "arial", sans-serif;
  background-color: #035e3f;
  border-radius: 10px;
  color: whitesmoke;
  border: none;
  font-size: 1.2rem;
  padding: 7px 30px 7px 30px;
  width: 45%;
  transition: all 0.3s ease-in-out;
  margin: 30px 0 20px 0;
  &:active {
    transform: scale(0.9);
  }
`;

const BarberTitle = styled.p`
  background-color: transparent;
  color: #e7e7b0;
  font-size: 1.5rem;
  padding: 7px 12px 7px 12px;
  margin-top: 20px;
  font-family: "Brandon Grotesque Regular";
`;

export default Barbers;
