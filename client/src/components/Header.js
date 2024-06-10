import { styled } from "styled-components";
import { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarPC from "./float-fixed/NavBarPC";
import SocialsPC from "./float-fixed/SocialsPC";
import { TimelineLite } from "gsap";
import logoSrc from "../assets/headerLogo.svg";
import onlyNameLogo from "../assets/onlyNameLogo.svg";
import { IsMobileContext } from "./contexts/IsMobileContext";
import { gsap } from "gsap";

const Header = () => {
  const [isSelected, setIsSelected] = useState("");
  const { isMobile } = useContext(IsMobileContext);
  const navigate = useNavigate();
  const location = useLocation();
  const logoRef = useRef(null);
  const logoNotHomeRef = useRef(null);
  const lineRef = useRef(null);
  const aboutLogoRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        if (logoNotHomeRef.current) {
          setScrolled(true);
          gsap.to(logoNotHomeRef.current, {
            left: "-3vw",
            top: "3vh",
            height: "10vh",
            duration: 0.5,
          });
        }
      } else {
        if (logoNotHomeRef.current) {
          setScrolled(false);
          gsap.to(logoNotHomeRef.current, {
            left: "10vh",
            top: "3vh",
            height: "15vh",
            duration: 0.5,
          });
        }
      }
    };

    if (location.pathname === "/ourTeam") {
      window.addEventListener("scroll", handleScroll);
    }

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    const tl = new TimelineLite();
    if (aboutLogoRef.current) {
      tl.fromTo(
        aboutLogoRef.current,
        { opacity: 0, x: -50, ease: "power2.out" },
        { opacity: 1, x: 0, duration: 0.6, delay: 2 }
      );
    }
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { opacity: 0, x: -50, ease: "power2.out" },
        { opacity: 1, x: 0, duration: 0.3, delay: 1 }
      );
    }
  }, [location.pathname]);

  useEffect(() => {
    const tl = new TimelineLite();
    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { opacity: 0, ease: "power2.out" },
        { opacity: 1, duration: 0.3, delay: 2 }
      );
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") return;
    const tl = new TimelineLite();
    if (logoNotHomeRef.current) {
      tl.fromTo(
        logoNotHomeRef.current,
        { opacity: 0, x: -50, ease: "power2.out" },
        { opacity: 1, x: 0, duration: 0.6, delay: 1 }
      );
    }
  }, [location.pathname]);

  if (isMobile) return null;

  return (
    <WrapperPC $location={location.pathname} $scrolled={scrolled}>
      <div style={{ position: "relative", maxHeight: "100%" }}>
        {location.pathname === "/" ? (
          <Logo
            key="logoForPC"
            src={logoSrc}
            ref={logoRef}
            alt="Hollywood Fairmount Barbers"
            onClick={() => {
              setIsSelected("");
              navigate("/");
            }}
          />
        ) : location.pathname === "/about" ? (
          <Logo
            key="logoForAbout"
            src={onlyNameLogo}
            ref={aboutLogoRef}
            alt="Hollywood Fairmount Barbers"
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
            key="logoNotHome"
            src={onlyNameLogo}
            ref={logoNotHomeRef}
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
        <Line $location={location.pathname} ref={lineRef} />
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
  border-bottom: ${(props) => (props.$scrolled ? "1px solid #006044" : "none")};
`;

const Logo = styled.img`
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
    return "#eeebde";
  }};
  gap: 1vw;
  width: 100vw;
  height: 8vh;
  position: fixed;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
`;

export default Header;
