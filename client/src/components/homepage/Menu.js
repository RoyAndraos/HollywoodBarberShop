import styled from "styled-components";
import { useContext } from "react";
import { TextContext } from "../contexts/TextContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
import { ServiceContext } from "../contexts/ServiceContext";
const Menu = () => {
  const { text } = useContext(TextContext);
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const menuText = text.filter((text) => text._id === "underMenu")[0].content;
  const frenchMenuText = text.filter((text) => text._id === "underMenu")[0]
    .french;
  const { services } = useContext(ServiceContext);
  return (
    <Wrapper
      id="menu-section"
      key={"menu-section"}
      className="snap-element"
      $isMobile={isMobile}
    >
      <TitleWrapper>
        <Title>{language === "en" ? "Our Prices" : "Nos Prix"}</Title>
      </TitleWrapper>
      <ThanksWrapper>
        * <br />* <br />* <br />*<br /> * <br />* <br />* <br />* <br />*
        <Appreciate>{language === "en" ? menuText : frenchMenuText}</Appreciate>
        * <br />* <br />* <br />*<br /> * <br />* <br />* <br />* <br />*
      </ThanksWrapper>
      <MenuWrapper>
        {services.map((service) => {
          return (
            <Service key={service._id}>
              <p>{language === "en" ? service.english : service.name}</p>
              <Price>{service.price}</Price>
            </Service>
          );
        })}
      </MenuWrapper>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  border-left: ${(props) => (props.$isMobile ? "5px solid #011c13" : "none")};
  border-right: ${(props) => (props.$isMobile ? "5px solid #011c13" : "none")};
  background-color: ${(props) => (props.$isMobile ? "#011c13" : "whitesmoke")};
  padding-top: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: white;
  min-height: 100vh;
  position: relative;
  scroll-snap-align: start;
`;
const Service = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  gap: 20px;
  background-color: rgba(3, 94, 63, 0.7);
  padding: 10px 25px;
  border-radius: 3px;
  align-content: center;
  align-items: center;
  width: 85vw;
`;
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 50vh;
`;
export const Title = styled.p`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2vw 0 2vw;
  font-size: 1.3rem;
  letter-spacing: 2px;
  width: 100%;
  border-radius: 10px;
  background-color: #035e3f;
  height: 50%;
  font-family: "roboto", sans-serif;
  border-bottom: 6px solid rgba(0, 0, 0, 0.9);
`;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98vw;
  height: 13vh;
`;
const Appreciate = styled.p`
  font-size: 1rem;
  margin: 5px 15% 5px 15%;
  line-height: 1.5;
  font-style: italic;
  letter-spacing: 2px;
  color: #e7e7b0;
  font-family: "Brandon Grotesque Regular", sans-serif;
`;
const Price = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 2px;
  font-weight: 700;
  color: #e7e7b0;
  font-family: "Brandon Grotesque Regular", sans-serif;
`;
const ThanksWrapper = styled.div`
  display: flex;
  width: 77vw;
  justify-content: center;
  align-items: center;
  height: 20vh;
  text-align: center;
`;
export default Menu;
