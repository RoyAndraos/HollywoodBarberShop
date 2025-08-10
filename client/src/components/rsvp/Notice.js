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
          ? "Hello everyone! Ralph will be away from September 10th and will be back to work on October 7th. Thank you for your continued support and understanding."
          : "Chers clients, Ralph sera absent du 10 septembre au 7 octobre. Merci pour votre soutien et votre compréhension."}
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
