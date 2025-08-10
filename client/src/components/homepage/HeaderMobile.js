import logo from "../../assets/onlyNameLogo.svg";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const HeaderMobile = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const handleToggleLanguage = () => {
    if (language === "en") {
      setLanguage("fr");
    } else {
      setLanguage("en");
    }
  };
  return (
    <Wrapper>
      <LeftWrap>
        <img src={logo} alt="Hollywood Fairmount Barbers" />
      </LeftWrap>
      <ButtonsWrap>
        <FrButton onClick={() => handleToggleLanguage("en")}>
          {language === "en" ? "FR" : "EN"}
        </FrButton>
        <BookButton
          onClick={() => {
            navigate("/notice");
          }}
        >
          {language === "en" ? "BOOK NOW!" : "RESERVER!"}
        </BookButton>
      </ButtonsWrap>
    </Wrapper>
  );
};

const ButtonsWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const BookButton = styled.button`
  background-color: #006044;
  border: none;
  color: whitesmoke;
  font-size: 1.1rem;
  padding: 13px 10px;
`;

const FrButton = styled.button`
  background-color: transparent;
  border: none;
  color: #006044;
  font-size: 1.1rem;
  padding: 0;
  border-bottom: 1px solid #006044;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px;
`;
const LeftWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 30vw;
  }
`;

export default HeaderMobile;
