import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IsMobileContext } from "../contexts/IsMobileContext";
import { LanguageContext } from "../contexts/LanguageContext";
import logoNotHome from "../../assets/onlyNameLogo.svg";

const Notice = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  return (
    <Wrapper>
      {isMobile && (
        <Logo
          src={logoNotHome}
          alt="hollywood barbershop logo"
          onClick={() => {
            navigate("/");
          }}
        />
      )}
      <p>
        {language === "en"
          ? "Dear Clients, Ralph will be temporarily unavailable starting February 12th for approximately 2 to 3 weeks due to a scheduled hospital operation. We kindly ask that you book your appointments before February 12th if you wish to see him prior to his break. Thank you for your understanding and continued support."
          : "Chers clients, Ralph ne sera temporairement pas disponible à partir du 12 février pour une période d'environ 2 à 3 semaines en raison d'une opération hospitalière programmée. Nous vous demandons de bien vouloir prendre rendez-vous avant le 12 février si vous souhaitez le voir avant sa pause. Merci pour votre compréhension et votre soutien continu."}
      </p>
      <StyledButton
        onClick={() => {
          navigate("/book");
        }}
      >
        {language === "en"
          ? "Continue to booking"
          : "Continuer à la réservation"}
      </StyledButton>
    </Wrapper>
  );
};
const Logo = styled.img`
  width: 50vw;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 7vh;
  height: 70vh;
  top: 10vh;
  position: relative;
  font-size: 1.5rem;
  padding: 0 20px;
  text-align: center;
  color: #006044;
  p {
    font-size: 1.2rem;
    width: 40vw;
  }
  @media (max-width: 1000px) {
    p {
      width: 80vw;
    }
  }
`;
const StyledButton = styled.button`
  width: 10%;
  padding: 10px;
  background-color: #006044;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s ease-in-out;
  font-family: "Helvetica Neue", sans-serif;
  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
  @media (max-width: 1000px) {
    width: 50%;
  }
`;

export default Notice;
