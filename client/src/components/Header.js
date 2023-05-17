import { styled } from "styled-components";
import background from "../assets/bg1.png";
import { FaUser } from "react-icons/fa";
import BurgerMenu from "./BurgerMenu";
import { useState } from "react";
import DropDownMenu from "./DropDownMenu";
import { useLocation } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState("false");
  const location = useLocation();
  return (
    <Wrapper>
      {!location.pathname.includes("/admin") && <StylecAccount />}
      <Logo src={background} />
      {!location.pathname.includes("/admin") && (
        <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {isOpen === "true" && <DropDownMenu />}
    </Wrapper>
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
`;
const Logo = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 80%;
  margin: 10px 0 10px 0;
  border-radius: 30%;
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
