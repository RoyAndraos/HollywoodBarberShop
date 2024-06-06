import styled from "styled-components";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
import Loader from "../float-fixed/Loader";
import { ServiceContext } from "../contexts/ServiceContext";
import { TextContext } from "../contexts/TextContext";
import ServiceHeader from "./ServiceHeader";
const Menu = () => {
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const { text } = useContext(TextContext);
  const { services } = useContext(ServiceContext);

  const MenuText = text.filter((item) => item._id === "underMenu");
  if (!text || !services) {
    return <Loader />;
  }
  return (
    <Wrapper id="menu-section" key={"menu-section"} $isMobile={isMobile}>
      <ServiceHeader />
      <MenuWrapper>
        {services.map((service) => {
          return (
            <Service key={service._id}>
              <p>{language === "en" ? service.english : service.name}</p>
              <p>{service.price}$</p>
            </Service>
          );
        })}
      </MenuWrapper>
      <FooterWrapper>
        <p>{language === "en" ? MenuText[0].content : MenuText[0].french}</p>
        <button>{language === "en" ? "BOOK NOW!" : "RESERVER!"}</button>
      </FooterWrapper>
    </Wrapper>
  );
};
const FooterWrapper = styled.div`
  width: 85vw;
  margin-top: 8vh;
  margin-bottom: 5vh;
  display: flex;
  justify-content: space-between;
  button {
    width: 40vw;
    border: 1px solid transparent;
    font-family: "Helvetica Neue", sans-serif;
    font-weight: 200;
    letter-spacing: 1px;
    font-size: 1.1rem;
    color: #006044;
    box-shadow: -6px 6px 6px 0 rgb(0 0 0 / 15%);
  }
  p {
    width: 40vw;
    font-size: 0.65rem;
  }
`;
export const Wrapper = styled.div`
  background-color: #eeebde;
  padding-top: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #006044;
  color: whitesmoke;
  position: relative;
  scroll-snap-align: start;
`;
const Service = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  gap: 10px;
  padding-top: 10px;
  align-content: center;
  align-items: center;
  width: 85vw;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.4);
  &:first-of-type {
    padding-top: 0;
  }
`;
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  margin-top: 8vh;
`;
export const Title = styled.p`
  color: whitesmoke;
  border-bottom: 1px solid #006044;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  padding: 0 10px;
  color: #006044;
  background-color: transparent;
`;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 98vw;
  height: 13vh;
`;

export default Menu;
