import { keyframes } from "styled-components";
import { styled } from "styled-components";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const DropDownMenu = ({
  menuRef,
  barbersRef,
  aboutRef,
  setIsOpen,
  isopen,
  slideshowRef,
}) => {
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setIsOpen("false"); // Close the menu
  };
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <Wrapper isopen={isopen}>
      <Ul>
        <Li>
          <StyledButton
            onClick={() => {
              scrollToRef(menuRef);
            }}
          >
            Menu
          </StyledButton>
        </Li>
        <Li>
          <StyledButton
            onClick={() => {
              scrollToRef(barbersRef);
            }}
          >
            {language === "en" ? "Barbers" : "Coiffeurs"}
          </StyledButton>
        </Li>
        <Li>
          <StyledButton
            onClick={() => {
              scrollToRef(aboutRef);
            }}
          >
            {language === "en" ? "About" : "A propos"}
          </StyledButton>
        </Li>
        <Li>
          <StyledButton
            onClick={() => {
              if (language === "en") {
                setLanguage("fr");
              } else {
                setLanguage("en");
              }
            }}
          >
            Fr | En
          </StyledButton>
        </Li>
        <Li>
          <StyledButton
            onClick={() => {
              scrollToRef(slideshowRef);
            }}
          >
            {language === "en" ? "Back to Top" : "Retour en haut"}
          </StyledButton>
        </Li>
      </Ul>
    </Wrapper>
  );
};

const slideIn = keyframes`
  0% {

    transform: translateX(100%);
  }

  100% {

    transform: translateX(0);
  }
`;
const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;
const Wrapper = styled.div`
  position: fixed;
  right: ${(props) => (props.isopen === "true" ? "0" : "-100%")};
  top: 10vh;
  height: 28vh;
  padding: 0 20px 0 20px;
  animation: ${(props) => (props.isopen ? slideIn : slideOut)} 0.5s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: transparent;
  z-index: 10;
`;

const Ul = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const Li = styled.li`
  width: 100%;
  z-index: 10;
`;

const StyledButton = styled.button`
  font-family: "arial", sans-serif;
  background-color: whitesmoke;
  border-radius: 10px;
  border: none;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  color: #002b1c;
  padding: 7px 10px 7px 10px;
  transition: all 0.3s ease-in-out;
  margin-bottom: 15px;
  z-index: 10;

  &:active {
    transform: scale(0.9);
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export default DropDownMenu;
