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
        <button
          onClick={() => handleToggleLanguage("en")}
          style={{ padding: "13px 5px" }}
        >
          {language === "en" ? "FR" : "EN"}
        </button>
      </LeftWrap>
      <button
        onClick={() => {
          navigate("/book");
        }}
      >
        {language === "en" ? "BOOK NOW!" : "RESERVER!"}
      </button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px;

  button {
    background-color: #006044;
    border: none;
    color: whitesmoke;
    font-size: 1.1rem;
    padding: 13px 10px;
  }
`;
const LeftWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  img {
    width: 30vw;
  }
`;

export default HeaderMobile;
