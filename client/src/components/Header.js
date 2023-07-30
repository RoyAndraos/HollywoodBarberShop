import { styled } from "styled-components";
import { FaUser } from "react-icons/fa";
import BurgerMenu from "./BurgerMenu";
import { useState, useEffect, useRef } from "react";
import DropDownMenu from "./DropDownMenu";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState("false");
  const location = useLocation();
  const menuRef = useRef(null);
  const barbersRef = useRef(null);
  const aboutRef = useRef(null);
  useEffect(() => {
    menuRef.current = document.getElementById("menu-section");
    barbersRef.current = document.getElementById("barbers-section");
    aboutRef.current = document.getElementById("about-section");
  }, []);
  return (
    <div style={{ backgroundColor: "#011c13" }}>
      <Wrapper>
        <StylecAccount />
        <StyledNavLink to="/">
          <Logo src={"/assets/bg1.png"} />
        </StyledNavLink>
        {location.pathname !== "/book" && (
          <BurgerMenu isopen={isOpen} setIsOpen={setIsOpen} />
        )}
        {isOpen === "true" && (
          <DropDownMenu
            setIsOpen={setIsOpen}
            menuRef={menuRef}
            barbersRef={barbersRef}
            aboutRef={aboutRef}
          />
        )}
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 98vw;
  height: 10vh;
  position: relative;
  background-color: #035e3f;
  border: 5px solid rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  left: 1vw;
`;
const Logo = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  border-radius: 30%;
  width: 33%;
`;

const StylecAccount = styled(FaUser)`
  font-size: 25px;
  margin-left: 15px;
  margin-bottom: 15px;
  opacity: 0.8;
  color: white;
`;

const StyledNavLink = styled(NavLink)`
  position: absolute;
  height: 100%;
  width: 100%;
  height: 80%;
  top: 10%;
`;

export default Header;
