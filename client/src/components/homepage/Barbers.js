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
            <NameWrapper>
              <BarberTitle>
                {barber.given_name + " " + barber.family_name}
              </BarberTitle>
            </NameWrapper>
            <Description> {barber.description}</Description>
          </BarberWrapper>
        );
      })}
      <Book onClick={() => navigate("/book")}>
        {language === "en" ? "Book" : "Reserver"}
      </Book>
    </Wrapper>
  );
};
const NameWrapper = styled.div`
  width: 70vw;
`;
const BarberWrapper = styled.div`
  display: flex;
  height: 45vh;
  width: 70vw;
  font-size: 1.2rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: #035e3f;
  padding-bottom: 20px;
  border-bottom: 1px solid #035e3f;
  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
`;
const Avatar = styled.img`
  width: 120px;
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
  padding: 7px 0;
  margin-top: 20px;
  font-family: "Brandon Grotesque Regular";
`;

export default Barbers;
