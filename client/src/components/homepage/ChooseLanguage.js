import { useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../contexts/LanguageContext";
import Header from "../Header";
const ChooseLanguage = () => {
  const { setLanguage } = useContext(LanguageContext);
  return (
    <Wrapper>
      <Header isShowing={false} />
      <ButtonWrapper>
        <StyledLangButton
          key={"english"}
          onClick={() => {
            setLanguage("en");
          }}
        >
          En
        </StyledLangButton>
        <StyledLangButton
          key={"french"}
          onClick={() => {
            setLanguage("fr");
          }}
        >
          Fr
        </StyledLangButton>
      </ButtonWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #002b1c;
  z-index: 9999;
  font-size: 2rem;
  font-family: sans-serif;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
`;
const StyledLangButton = styled.button`
  background-color: whitesmoke;
  border: 1px solid lightgrey;
  font-size: 2rem;
  width: 50%;
  padding: 1rem 0 1rem 0;
  color: #035e3f;
  &:first-of-type {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  &:last-of-type {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
export default ChooseLanguage;
