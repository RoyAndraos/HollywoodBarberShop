import { styled } from "styled-components";
import { FaUser } from "react-icons/fa";
import BurgerMenu from "./BurgerMenu";
import { useState, useEffect, useRef } from "react";
import DropDownMenu from "./DropDownMenu";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState("false");
  const location = useLocation();
  let menuRef = useRef(null);
  let barbersRef = useRef(null);
  let aboutRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    menuRef.current = document.getElementById("menu-section");
    barbersRef.current = document.getElementById("barbers-section");
    aboutRef.current = document.getElementById("about-section");
  }, []);

  return (
    <div style={{ backgroundColor: "#011c13" }}>
      <Wrapper>
        <AccountButton onClick={() => navigate("/login")}>
          <StylecAccount />
        </AccountButton>
        <StyledNavLink to="/">
          <Logo src={"/assets/bg1.png"} />
        </StyledNavLink>
        {location.pathname !== "/book" && (
          <div>
            <BurgerMenu isopen={isOpen} setIsOpen={setIsOpen} />
          </div>
        )}
        <DropDownMenu
          setIsOpen={setIsOpen}
          menuRef={menuRef}
          barbersRef={barbersRef}
          aboutRef={aboutRef}
          isOpen={isOpen}
        />
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  width: 98vw;
  height: 14vh;
  position: relative;
  background-color: #035e3f;
  border: 5px solid rgba(0, 0, 0, 0.7);
  border-bottom: none;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  left: 1vw;
  z-index: 1;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;
const Logo = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  border-radius: 30%;
  width: auto;
`;

const StylecAccount = styled(FaUser)`
  font-size: 1.4rem;
  margin-left: 15px;
  opacity: 0.8;
  color: white;
`;

const StyledNavLink = styled(NavLink)`
  position: absolute;
  width: 100%;
  height: 80%;
  top: 10%;
`;

const AccountButton = styled.button`
  position: fixed;
  position: fixed;
  top: 5.4%;
  left: 25px;
  background-color: transparent;
  border: none;
  z-index: 1000;
`;

export default Header;
