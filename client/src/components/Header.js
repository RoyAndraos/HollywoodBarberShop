import { styled } from "styled-components";
import { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import NavBarPC from "./float-fixed/NavBarPC";
import SocialsPC from "./float-fixed/SocialsPC";
import { TimelineLite } from "gsap";
import { useNavigate } from "react-router-dom";
import logoSrc from "../assets/headerLogo.svg";
import onlyNameLogo from "../assets/onlyNameLogo.svg";
import { IsMobileContext } from "./contexts/IsMobileContext";

const Header = () => {
  const [isSelected, setIsSelected] = useState("");
  const { isMobile } = useContext(IsMobileContext);
  const navigate = useNavigate();
  const location = useLocation();
  let logoRef = useRef(null);
  let logoNotHomeRef = useRef(null);
  let lineRef = useRef(null);
  let aboutLogoRef = useRef(null);
  useEffect(() => {
    const tl = new TimelineLite();
    if (aboutLogoRef) {
      tl.fromTo(
        aboutLogoRef,
        {
          opacity: 0,
          x: -50,
          ease: "power2.out",
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 2,
        }
      );
    }
    if (!logoRef) return;
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
    if (!lineRef) return;
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
  if (isMobile) return;
  return (
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
            alt="Hollywood Fairmount Barbers"
            onClick={() => {
              setIsSelected("");
              navigate("/");
            }}
          />
        ) : location.pathname === "/about" ? (
          <Logo
            key={"logoForPC"}
            src={onlyNameLogo}
            alt="Hollywood Fairmount Barbers"
            ref={(el) => (aboutLogoRef = el)}
            style={{
              top: "3vh",
              height: "15vh",
              padding: "0 1vw 1vh 0",
            }}
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
            alt="Hollywood Fairmount Barbers"
            style={{
              top: "3vh",
              height: "15vh",
              backgroundColor: "#eeebde",
              padding: "0 1vw 1vh 0",
              borderBottomRightRadius: "10px",
              zIndex: -3,
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

export const Logo = styled.img`
  position: relative;
  height: 7vh;
  margin-left: 10vw;
  cursor: pointer;
  z-index: 0;
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
  gap: 1vw;
  width: 100vw;
  height: 8vh;
  position: fixed;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
`;
export default Header;
