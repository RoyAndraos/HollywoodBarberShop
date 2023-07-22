import { styled } from "styled-components";
const DropDownMenu = () => {
  return <Wrapper>
          <ul>
            <li>Barbers</li>
          </ul>
          <ul>
            <li>About</li>
          </ul>
          <ul>
            <li>Book</li>
          </ul>
        </Wrapper>;
};

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 10vh;
  border: 1px solid black;
`;

export default DropDownMenu;
