import { styled } from "styled-components";
import BurgerMenu from "./float-fixed/BurgerMenu";
import { useState, useRef, useContext, useEffect } from "react";
import DropDownMenu from "./float-fixed/DropDownMenu";
import { NavLink, useLocation } from "react-router-dom";
import Footer from "../components/float-fixed/Footer";
import { IsMobileContext } from "./contexts/IsMobileContext";
import NavBarPC from "./float-fixed/NavBarPC";
import SocialsPC from "./float-fixed/SocialsPC";
import { TimelineLite } from "gsap";
import { useNavigate } from "react-router-dom";
import logoSrc from "../assets/headerLogo.svg";
import onlyNameLogo from "../assets/onlyNameLogo.svg";
import logoHomeCenter from "../assets/logoHomeCenter.svg";

const Header = ({ isShowing }) => {
  const [isOpen, setIsOpen] = useState("false");
  const { isMobile } = useContext(IsMobileContext);
  const [isSelected, setIsSelected] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let logoRef = useRef(null);
  let logoNotHomeRef = useRef(null);
  let lineRef = useRef(null);
  useEffect(() => {
    if (location.pathname !== "/") return;
    const tl = new TimelineLite();
    tl.fromTo(
      logoRef,
      {
        opacity: 0,
        x: -50,
        ease: "power2.out",
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        delay: 1,
      }
    );
  }, [location.pathname]);
  useEffect(() => {
    const tl = new TimelineLite();
    tl.fromTo(
      lineRef,
      {
        opacity: 0,
        ease: "power2.out",
      },
      {
        opacity: 1,
        duration: 0.3,
        delay: 2,
      }
    );
  }, []);
  useEffect(() => {
    if (location.pathname === "/") return;
    const tl = new TimelineLite();
    if (!logoNotHomeRef) return;
    tl.fromTo(
      logoNotHomeRef,
      {
        opacity: 0,
        x: -50,
        ease: "power2.out",
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: 1,
      }
    );
  }, [location.pathname]);
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
            <Logo key={"logoForMobile"} src={logoSrc} $isMobile={isMobile} />
          </StyledNavLink>
          {isShowing === true && (
            <BurgerMenu isopen={isOpen} setIsOpen={setIsOpen} />
          )}
          <DropDownMenu setIsOpen={setIsOpen} isopen={isOpen} />
          <Footer />
        </Wrapper>
      ) : (
        <WrapperPC $location={location.pathname}>
          <div
            style={{
              position: "relative",
              maxHeight: "100%",
            }}
          >
            {location.pathname === "/" ? (
              <Logo
                key={"logoForPC"}
                src={logoSrc}
                ref={(el) => (logoRef = el)}
                onClick={() => {
                  setIsSelected("");
                  navigate("/");
                }}
              />
            ) : location.pathname === "/about" ? (
              <Logo
                key={"logoForPC"}
                src={logoHomeCenter}
                ref={(el) => (logoRef = el)}
                style={{ maxHeight: "15vh", zIndex: "900", top: "3vh" }}
                onClick={() => {
                  setIsSelected("");
                  navigate("/");
                }}
              />
            ) : (
              <Logo
                key={"logoForPC"}
                src={onlyNameLogo}
                ref={(el) => (logoNotHomeRef = el)}
                style={{
                  maxHeight: "15vh",
                  zIndex: "900",
                  top: "3vh",
                  backgroundColor: "#eeebde",
                  padding: "1vh 1vw",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  setIsSelected("");
                  navigate("/");
                }}
              />
            )}
          </div>
          <RightSideWrapper>
            <NavBarPC isSelected={isSelected} setIsSelected={setIsSelected} />
            <Line $location={location.pathname} ref={(el) => (lineRef = el)} />
            <SocialsPC />
          </RightSideWrapper>
        </WrapperPC>
      )}
    </div>
  );
};

const Line = styled.div`
  width: 1px;
  height: 2.6vh;
  background-color: ${(props) =>
    props.$location !== "/" ? "#006044" : "#eeebde"};
`;
const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  min-width: 40vw;
  max-width: 80vw;
  justify-content: space-around;
  margin-right: 3vw;
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
  max-height: ${(props) => (props.$isMobile ? "unset" : "8vh")};
  max-width: 200px;
  margin-left: 5vw;
  @media (min-width: 768px) {
    position: relative;
    left: unset;
    transform: unset;
    min-height: 5vh;
    max-height: 6.5vh;
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
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => {
    if (props.$location === "/") return "#006044";
    if (props.$location === "/about") return "transparent";
    else return "#eeebde";
  }};
  height: 8vh;
  gap: 1vw;
  width: 100vw;
  position: fixed;
  transition: all 0.3s ease-in-out;
`;
export default Header;
