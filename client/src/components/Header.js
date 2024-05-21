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
// import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

const Header = ({ isShowing }) => {
  const [isOpen, setIsOpen] = useState("false");
  const { isMobile } = useContext(IsMobileContext);
  const [headerHeight, setHeaderHeight] = useState("8vh");
  const [isSelected, setIsSelected] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  let menuRef = useRef(null);
  let barbersRef = useRef(null);
  let aboutRef = useRef(null);
  let slideshowRef = useRef(null);
  let textRef = useRef(null);
  let logoRef = useRef(null);
  // let backToTopRef = useRef(null);
  const scrollToRef = (ref) => {
    //if ref is menuRef, then scroll to it, then scroll up a bit
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!textRef.current) {
      return;
    }
    gsap.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.3 }
    );
  }, [headerHeight]);

  useEffect(() => {
    menuRef.current = document.getElementById("menu-section");
    barbersRef.current = document.getElementById("barbers-section");
    aboutRef.current = document.getElementById("about-section");
    slideshowRef.current = document.getElementById("slideshow-section");

    //animate the logo on load
    // if (showBackToTop) {
    //   gsap.fromTo(
    //     backToTopRef.current,
    //     { x: "100%" }, // Start from the right side of the screen
    //     { x: 0, duration: 0.5, ease: "power2.out" } // Move to the left (show)
    //   );
    // }
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      if (scrollHeight > 0) {
        if (headerHeight === "8vh") {
          setHeaderHeight("4vh"); // Change the height when scrolled
        }
      } else {
        setHeaderHeight("8vh"); // Default height when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location, headerHeight, isMobile]);
  return (
    <div
      style={{ backgroundColor: "whitesmoke", zIndex: "100" }}
      id="slideshow-section"
      className="snap-element"
    >
      {isMobile ? (
        <Wrapper>
          <StyledNavLink
            to="/"
            onClick={() => {
              setIsSelected("");
            }}
          >
            <Logo
              key={"logoForMobile"}
              src={"/assets/hello.jpg"}
              $isMobile={isMobile}
            />
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
              maxHeight: "100%",
            }}
          >
            {headerHeight === "8vh" ? (
              <Logo
                key={"logoForPC"}
                src={"/assets/hello.jpg"}
                ref={logoRef}
                onLoad={() => {
                  gsap.fromTo(
                    logoRef.current,
                    { opacity: 0 },
                    {
                      opacity: 1,
                      duration: 0.5,
                      ease: "power2.out",
                      delay: 0.3,
                    }
                  );
                }}
                onClick={() => {
                  setIsSelected("");
                  navigate("/");
                }}
              />
            ) : (
              <StyledLogoText ref={textRef}>HOLLYWOOD</StyledLogoText>
            )}
          </div>
          <NavBarPC
            menuRef={menuRef}
            barbersRef={barbersRef}
            aboutRef={aboutRef}
            slideshowRef={slideshowRef}
            scrollToRef={scrollToRef}
            headerHeight={headerHeight}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
          <SocialsPC headerHeight={headerHeight} />
        </WrapperPC>
      )}
      {/* {showBackToTop && (
        <BackToTop ref={backToTopRef}>
          <StyledButton
            onClick={() => {
              scrollToRef(slideshowRef);
            }}
          >
            <MdOutlineKeyboardDoubleArrowUp />
          </StyledButton>
        </BackToTop>
      )} */}
    </div>
  );
};
// const BackToTop = styled.div`
//   position: fixed;
//   bottom: 30vh;
//   right: 0;
//   background-color: #353333;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 0.5px solid rgba(255, 255, 255, 0.5);
//   margin-right: 0.5px;
//   width: 55px;
//   height: 45px;
//   transition: all 0.3s ease-in-out;
//   padding: 0;
//   margin-right: 1px;
//   &:hover {
//     opacity: 0.8;
//   }
// `;
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
  max-height: ${(props) => (props.$isMobile ? "unset" : "8vh")};
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
  background-color: #035e3f;
  height: ${(props) => props.$headerHeight};
  gap: 1vw;
  width: 100vw;
  position: fixed;
  transition: all 0.3s ease-in-out;
`;
const StyledLogoText = styled.p`
  color: whitesmoke;
  font-size: clamp(1.2rem, 1vh, 2rem);
  z-index: 2;
  font-family: "nexa-rust-slab-black-2", sans-serif;
  font-style: normal;
  color: whitesmoke;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  padding-right: 1vw;
`;
// const StyledButton = styled.button`
//   color: whitesmoke;
//   background-color: #353333;
//   border: none;
//   cursor: pointer;
//   font-size: 1.5rem;
//   transition: all 0.3s ease-in-out;
//   width: 100%;
//   height: 100%;
// `;
export default Header;
