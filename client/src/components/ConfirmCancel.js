import { useContext } from "react";
import { LanguageContext } from "./contexts/LanguageContext";
import styled from "styled-components";
import onlyNameLogo from "../assets/onlyNameLogo.svg";
import { useNavigate } from "react-router-dom";
import { IsMobileContext } from "./contexts/IsMobileContext";
const ConfirmCancel = () => {
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const navigate = useNavigate();
  return (
    <Wrapper>
      {isMobile && (
        <Logo
          src={onlyNameLogo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
      )}
      {language === "en"
        ? "You have successfully canceled your reservation"
        : "Vous avez annulé votre réservation avec succès"}
      <br />
      {language === "en" ? (
        <Link href="/">Go back to homepage</Link>
      ) : (
        <Link href="/">Retourner à la page d'accueil</Link>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #006044;
  text-align: center;
  font-size: 2rem;
  height: 100vh;
`;
const Link = styled.a`
  text-decoration: none;
  color: #006044;
  font-size: 1.2rem;
  opacity: 0.8;
  margin-top: 2rem;
`;
const Logo = styled.img`
  width: 20vh;
  position: absolute;
  top: 1rem;
`;
export default ConfirmCancel;
