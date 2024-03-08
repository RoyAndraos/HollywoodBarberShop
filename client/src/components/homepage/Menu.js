import styled from "styled-components";
import { useContext } from "react";
import { ImageContext } from "../contexts/ImageContext";
import { TextContext } from "../contexts/TextContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
const Menu = () => {
  const { images } = useContext(ImageContext);
  const { text } = useContext(TextContext);
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const menuImage = images.filter((image) => image.filename === "menu")[0];
  const menuText = text.filter((text) => text._id === "underMenu")[0].content;
  const frenchMenuText = text.filter((text) => text._id === "underMenu")[0]
    .french;
  return (
    <Wrapper
      id="menu-section"
      key={"menu-section"}
      className="snap-element"
      $isMobile={isMobile}
    >
      <TitleWrapper>
        <Title>Our Services</Title>
      </TitleWrapper>
      <StyledMenu $isMobile={isMobile} src={menuImage.src} alt="Menu" />
      <ThanksWrapper>
        * <br />* <br />* <br />*<br /> * <br />* <br />* <br />* <br />*
        <Appreciate>{language === "en" ? menuText : frenchMenuText}</Appreciate>
        * <br />* <br />* <br />*<br /> * <br />* <br />* <br />* <br />*
      </ThanksWrapper>
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
  justify-content: center;
  color: white;
  min-height: 100vh;
  position: relative;
  scroll-snap-align: start;
`;
const StyledMenu = styled.img`
  width: ${(props) => (props.$isMobile ? "90vw" : "40vw")};
  border-radius: 10px;
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
  font-size: 1.1rem;
  margin: 5px 25% 5px 25%;
  line-height: 1.5;
  font-style: italic;
  letter-spacing: 2px;
  color: #e7e7b0;
  font-family: "Brandon Grotesque Regular", sans-serif;
`;
const ThanksWrapper = styled.div`
  display: flex;
  width: 96vw;
  justify-content: center;
  align-items: center;
  height: 27vh;
  text-align: center;
`;
export default Menu;
