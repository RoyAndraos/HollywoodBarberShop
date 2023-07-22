import { styled } from "styled-components";
import { FaUser } from "react-icons/fa";
import BurgerMenu from "./BurgerMenu";
import { useState } from "react";
import DropDownMenu from "./DropDownMenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState("false");

  return (
    <div style={{ backgroundColor: "#011c13" }}>
      <Wrapper>
        <StylecAccount />
        <Logo src={"/assets/bg1.png"} />
        <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        {isOpen === "true" && <DropDownMenu />}
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 10vh;
  position: relative;
  background-color: #035e3f;
  border: 4px solid rgba(0, 0, 0, 0.7);
  border-radius: 10px;
`;
const Logo = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 80%;
  margin: 10px 0 10px 0;
  border-radius: 30%;
  width: 33%;
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.7);
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.7); */
`;

const StylecAccount = styled(FaUser)`
  font-size: 25px;
  margin-left: 15px;
  margin-bottom: 15px;
  opacity: 0.8;
  color: white;
`;

export default Header;
