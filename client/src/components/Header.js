import { styled } from "styled-components";
import BurgerMenu from "./float-fixed/BurgerMenu";
import { useState, useEffect, useRef, useContext } from "react";
import DropDownMenu from "./float-fixed/DropDownMenu";
import { NavLink, useLocation } from "react-router-dom";
import Footer from "../components/float-fixed/Footer";
import { IsMobileContext } from "./contexts/IsMobileContext";
import NavBarPC from "./float-fixed/NavBarPC";
import SocialsPC from "./float-fixed/SocialsPC";
const Header = ({ isShowing }) => {
  const [isOpen, setIsOpen] = useState("false");
  const { isMobile } = useContext(IsMobileContext);
  const location = useLocation();
  let menuRef = useRef(null);
  let barbersRef = useRef(null);
  let aboutRef = useRef(null);
  let slideshowRef = useRef(null);
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    menuRef.current = document.getElementById("menu-section");
    barbersRef.current = document.getElementById("barbers-section");
    aboutRef.current = document.getElementById("about-section");
    slideshowRef.current = document.getElementById("slideshow-section");
  }, [location]);
  return (
    <div
      style={{ backgroundColor: "whitesmoke", zIndex: "100" }}
      id="slideshow-section"
      className="snap-element"
    >
      {isMobile ? (
        <Wrapper>
          <StyledNavLink to="/">
            <Logo key={"logoForMobile"} src={"/assets/hello.jpg"} />
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
      ) : (
        <WrapperPC>
          <div
            style={{
              position: "relative",
              height: "100%",
            }}
          >
            <Logo
              key={"logoForPC"}
              src={"/assets/hello.jpg"}
              onClick={() => {
                scrollToRef(slideshowRef);
              }}
            />
            <LogoFilter />
          </div>
          <NavBarPC
            menuRef={menuRef}
            barbersRef={barbersRef}
            aboutRef={aboutRef}
            slideshowRef={slideshowRef}
            scrollToRef={scrollToRef}
          />
          <SocialsPC />
        </WrapperPC>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 10vh;
  top: 0;
  background-color: #035e3f;
  z-index: 2;
`;
const Logo = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 30%;
  width: 55%;
  max-width: 200px;
  @media (min-width: 768px) {
    position: relative;
    left: unset;
    width: auto;
    transform: unset;
    height: 95%;
    top: 2.5%;
    margin-right: 1vw;
    cursor: pointer;
    z-index: 0;
  }
`;

const LogoFilter = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    border-radius: 20%;
    top: 2.5%;
    width: 55%;
    max-width: 200px;
    background-color: rgba(0, 0, 0, 0.2);
    height: 95%;
    width: 100vw;
    z-index: 1;
  }
`;

const StyledNavLink = styled(NavLink)`
  @media (max-width: 768px) {
    position: absolute;
    height: 80%;
    width: 100%;
  }
`;
const WrapperPC = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 8vh;
  gap: 1vw;
  width: 100vw;
  position: fixed;
`;
export default Header;
