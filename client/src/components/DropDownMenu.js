import { keyframes } from "styled-components";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
const DropDownMenu = ({setIsOpen}) => {
  const navigate = useNavigate();
  const handleNavToGallery = (e) => {
    setIsOpen(false);
    e.preventDefault();
    navigate("/gallery")
  }
  
  return <Wrapper>
          <Ul>       
            <Li>
              <StyledButton>Menu</StyledButton>
            </Li>
            <Li>
              <StyledButton>Barbers</StyledButton>
            </Li>
            <Li>
              <StyledButton onClick={(e)=>{handleNavToGallery(e)}}>
                Gallery
              </StyledButton>
            </Li>
            <Li>
              <StyledButton>Book Now</StyledButton>
            </Li>
          </Ul>
        </Wrapper>;
};

const slideIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 10vh;
  border: 1px solid black;
  z-index: 1000;
  animation: ${slideIn} 0.5s ease-in-out;
  transition: all 0.3s ease-in-out; 
`;

const Ul = styled.ul`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`

const Li = styled.li`
  width:100%;
  margin-bottom: 5px;
`

const StyledButton = styled.button`
  width:100%;
  padding: 10px;
  border-radius: 10px;
`


export default DropDownMenu;
