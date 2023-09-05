import { styled } from "styled-components";
import { FaUser } from "react-icons/fa";
import BurgerMenu from "./BurgerMenu";
import { useState, useEffect, useRef, useContext } from "react";
import DropDownMenu from "./DropDownMenu";
import { NavLink, useLocation } from "react-router-dom";
import { BarberContext } from "./contexts/BarberContext";
import { TextContext } from "./contexts/TextContext";
import { ImageContext } from "./contexts/ImageContext";
const Header = () => {
  const [isOpen, setIsOpen] = useState("false");
  const { setBarberInfo } = useContext(BarberContext);
  const { setText } = useContext(TextContext);
  const { setImages } = useContext(ImageContext);
  const location = useLocation();
  const menuRef = useRef(null);
  const barbersRef = useRef(null);
  const aboutRef = useRef(null);
  useEffect(() => {
    menuRef.current = document.getElementById("menu-section");
    barbersRef.current = document.getElementById("barbers-section");
    aboutRef.current = document.getElementById("about-section");
  }, []);
  useEffect(() => {
    fetch("/getWebsiteInfo")
      .then((res) => res.json())
      .then((data) => {
        setBarberInfo(data.barbers);
        setText(data.text);
        setImages(data.images);
      });
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
  width: 33%;
`;

const StylecAccount = styled(FaUser)`
  font-size: 25px;
  margin-left: 15px;
  margin-bottom: 32px;
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
