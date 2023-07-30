import { keyframes } from "styled-components";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
const DropDownMenu = ({ menuRef, barbersRef, aboutRef, setIsOpen }) => {
  const navigate = useNavigate();
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setIsOpen("false"); // Close the dropdown menu after scrolling
  };

  return (
    <Wrapper>
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
    opacity: 0;
    transform: translateY(-100%);
  }
  75%{
    opacity: 0.1;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  right: 25px;
  top: 12vh;
  z-index: 1000;
  animation: ${slideIn} 0.5s ease-in-out;
  transition: all 0.3s ease-in-out;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Li = styled.li`
  width: 100%;
  margin-bottom: 20px;
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
  box-shadow: rgba(0, 0, 0, 0.6) 0px 54px 55px,
    rgba(0, 0, 0, 0.6) 0px -12px 30px, rgba(0, 0, 0, 0.6) 0px 4px 6px,
    rgba(0, 0, 0, 0.6) 0px 12px 13px, rgba(0, 0, 0, 0.6) 0px -3px 5px;
  &:active {
    transform: scale(0.9);
  }
`;

export default DropDownMenu;
