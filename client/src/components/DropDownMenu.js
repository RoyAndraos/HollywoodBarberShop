import { keyframes } from "styled-components";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const DropDownMenu = ({ menuRef, barbersRef, aboutRef, setIsOpen, isOpen }) => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setIsOpen("false"); // Close the dropdown menu after scrolling
    setIsExiting(true); // Start the slide-out animation
  };
  useEffect(() => {
    if (isExiting) {
      // After the duration of the slide-out animation (500ms in this case),
      // set isOpen to false and allow the component to unmount
      setTimeout(() => {
        setIsOpen("false");
      }, 500);
    }
  }, [isExiting, setIsOpen]);

  return (
    <Wrapper isOpen={isOpen} className={isExiting ? "slide-out" : ""}>
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
            Barbers
          </StyledButton>
        </Li>
        <Li>
          <StyledButton
            onClick={() => {
              scrollToRef(aboutRef);
            }}
          >
            About
          </StyledButton>
        </Li>
        <Li>
          <StyledButton
            onClick={() => {
              setIsOpen("false");
              navigate("/book");
            }}
          >
            Book Now
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
  right: ${(props) => (props.isOpen ? "0" : "-100%")};
  top: 14vh;
  height: 25vh;
  padding: 0 20px 0 20px;
  z-index: 1000;
  animation: ${(props) => (props.isOpen ? slideIn : slideOut)} 0.5s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #011c13;
  &.slide-out {
    animation: ${slideOut} 0.5s ease-in-out;
    animation-fill-mode: forwards; /* Keep the final style of the animation */
  }
`;

const Ul = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
`;

const Li = styled.li`
  width: 100%;
`;

const StyledButton = styled.button`
  font-family: "arial", sans-serif;
  background-color: whitesmoke;
  border-radius: 10px;
  border: none;
  width: 100%;
  font-size: 0.9rem;
  font-weight: 600;
  color: #035e3f;
  padding: 7px 10px 7px 10px;
  transition: all 0.3s ease-in-out;
  box-shadow: 5px 5px 5px black;
  &:active {
    transform: scale(0.9);
  }
`;

export default DropDownMenu;
