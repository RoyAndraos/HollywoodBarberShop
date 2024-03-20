import { styled } from "styled-components";
import BurgerMenu from "./float-fixed/BurgerMenu";
import { useState, useEffect, useRef, useContext } from "react";
import DropDownMenu from "./float-fixed/DropDownMenu";
import { NavLink, useLocation } from "react-router-dom";
import Footer from "../components/float-fixed/Footer";
import { IsMobileContext } from "./contexts/IsMobileContext";
import NavBarPC from "./float-fixed/NavBarPC";
import SocialsPC from "./float-fixed/SocialsPC";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const Header = ({ isShowing }) => {
  const [isOpen, setIsOpen] = useState("false");
  const { isMobile } = useContext(IsMobileContext);
  const [headerHeight, setHeaderHeight] = useState("8vh");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  let menuRef = useRef(null);
  let barbersRef = useRef(null);
  let aboutRef = useRef(null);
  let slideshowRef = useRef(null);
  let logoRef = useRef(null);
  let textRef = useRef(null);
  let backToTopRef = useRef(null);
  const scrollToRef = (ref) => {
    //if ref is menuRef, then scroll to it, then scroll up a bit
    if (!isMobile && ref === menuRef) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      // Delay the scrollBy operation slightly after scrollIntoView
      setTimeout(() => {
        window.scrollBy(0, -200);
      }, 350);
    } else {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    menuRef.current = document.getElementById("menu-section");
    barbersRef.current = document.getElementById("barbers-section");
    aboutRef.current = document.getElementById("about-section");
    slideshowRef.current = document.getElementById("slideshow-section");

    //animate the logo on load
    if (showBackToTop) {
      gsap.fromTo(
        backToTopRef.current,
        { x: "100%" }, // Start from the right side of the screen
        { x: 0, duration: 0.5, ease: "power2.out" } // Move to the left (show)
      );
    }
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      if (scrollHeight > 0) {
        if (headerHeight === "8vh") {
          setHeaderHeight("4vh"); // Change the height when scrolled
          setShowBackToTop(true);
        }
      } else {
        setHeaderHeight("8vh"); // Default height when at the top
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location, headerHeight, showBackToTop]);
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
        <WrapperPC $headerHeight={headerHeight}>
          <div
            style={{
              position: "relative",
              height: "100%",
            }}
          >
            {headerHeight === "8vh" ? (
              <Logo key={"logoForPC"} src={"/assets/hello.jpg"} ref={logoRef} />
            ) : (
              <StyledLogoText ref={textRef}>HOLLYWOOD</StyledLogoText>
            )}
            {headerHeight === "8vh" && (
              <LogoFilter
                onClick={() => {
                  if (location.pathname !== "/") {
                    navigate("/");
                  }
                }}
              />
            )}
          </div>
          <NavBarPC
            menuRef={menuRef}
            barbersRef={barbersRef}
            aboutRef={aboutRef}
            slideshowRef={slideshowRef}
            scrollToRef={scrollToRef}
            headerHeight={headerHeight}
          />
          <SocialsPC headerHeight={headerHeight} />
        </WrapperPC>
      )}
      {showBackToTop && (
        <BackToTop ref={backToTopRef}>
          <StyledButton
            onClick={() => {
              scrollToRef(slideshowRef);
            }}
          >
            ^
          </StyledButton>
        </BackToTop>
      )}
    </div>
  );
};
const BackToTop = styled.div`
  position: fixed;
  bottom: 30vh;
  right: 0;
  background-color: #353333;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid rgba(255, 255, 255, 0.5);
  margin-right: 0.5px;
  width: 2vw;
  height: 2vw;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;
const Wrapper = styled.div`
  width: 100vw;
  height: 10vh;
  top: 0;
  background-color: #035e3f;
  z-index: 2;
`;
export const Logo = styled.img`
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
    cursor: pointer;
  }
`;

const StyledNavLink = styled(NavLink)`
  @media (max-width: 768px) {
    position: absolute;
    height: unset;
    width: 100%;
  }
`;
const WrapperPC = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: ${(props) => props.$headerHeight};
  gap: 1vw;
  width: 100vw;
  position: fixed;
  transition: all 0.3s ease-in-out;
`;
const StyledLogoText = styled.h1`
  color: whitesmoke;
  font-size: 1.5rem;
  z-index: 2;
  font-family: "nexa-rust-slab-black-2", sans-serif;
  font-style: normal;
  color: #079061;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  padding-right: 1vw;
`;
const StyledButton = styled.button`
  color: whitesmoke;
  background-color: #353333;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease-in-out;
  width: 100%;
  height: 100%;
`;
export default Header;
