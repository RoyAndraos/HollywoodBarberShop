import { styled } from "styled-components";
import BurgerMenu from "./float-fixed/BurgerMenu";
import { useState, useEffect, useRef } from "react";
import DropDownMenu from "./float-fixed/DropDownMenu";
import { NavLink, useLocation } from "react-router-dom";
import Footer from "../components/float-fixed/Footer";
const Header = ({ isShowing }) => {
  const [isOpen, setIsOpen] = useState("false");
  const location = useLocation();
  let menuRef = useRef(null);
  let barbersRef = useRef(null);
  let aboutRef = useRef(null);
  let slideshowRef = useRef(null);

  useEffect(() => {
    menuRef.current = document.getElementById("menu-section");
    barbersRef.current = document.getElementById("barbers-section");
    aboutRef.current = document.getElementById("about-section");
    slideshowRef.current = document.getElementById("slideshow-section");
  }, [location]);
  return (
    <div
      style={{ backgroundColor: "whitesmoke", zIndex: "1" }}
      id="slideshow-section"
      className="snap-element"
    >
      <Wrapper>
        <StyledNavLink to="/">
          <Logo src={"/assets/hello.jpg"} />
        </StyledNavLink>
        {isShowing === true && (
          <BurgerMenu isopen={isOpen} setIsOpen={setIsOpen} />
        )}
        <DropDownMenu
          setIsOpen={setIsOpen}
          menuRef={menuRef}
          barbersRef={barbersRef}
          aboutRef={aboutRef}
          isopen={isOpen}
          slideshowRef={slideshowRef}
        />
        <Footer />
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 17vh;
  position: relative;
  top: 0;
  background-color: #035e3f;
`;
const Logo = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 0.6vh;
  border-radius: 30%;
  width: 55%;
  border: 3px solid #002b1c;
`;

const StyledNavLink = styled(NavLink)`
  position: absolute;
  width: 100%;
  height: 80%;
  top: 4%;
`;

export default Header;
