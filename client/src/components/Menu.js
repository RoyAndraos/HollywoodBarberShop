import styled from "styled-components";
import { useContext } from "react";
import { ImageContext } from "./contexts/ImageContext";
import { TextContext } from "./contexts/TextContext";
const Menu = () => {
  const { images } = useContext(ImageContext);
  const { text } = useContext(TextContext);

  const menuImage = images.filter((image) => image.filename === "menu")[0];
  const menuText = text.filter((text) => text._id === "underMenu")[0].content;
  return (
    <Wrapper id="menu-section" key={"menu-section"}>
      <TitleWrapper>
        <Title>Menu</Title>
      </TitleWrapper>
      <StyledMenu src={menuImage.src} alt="Menu" />
      <ThanksWrapper>
        * <br />* <br />* <br />*<br /> * <br />* <br />* <br />* <br />*
        <Appreciate>{menuText}</Appreciate>
        * <br />* <br />* <br />*<br /> * <br />* <br />* <br />* <br />*
      </ThanksWrapper>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 100vw;
  border-left: 5px solid #011c13;
  border-right: 5px solid #011c13;
  background-color: #011c13;
  padding-top: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  height: 100vh;
  position: relative;
`;
const StyledMenu = styled.img`
  width: 94vw;
  border-radius: 10px;
`;
export const Title = styled.p`
  color: white;
  margin: 10px 2vw 15px 2vw;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  background-color: #035e3f;
  justify-content: center;
  padding: 9px;
  border-bottom: 6px solid rgba(0, 0, 0, 0.9);
  text-shadow: 5px 5px 5px black;
`;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: 98vw;
  height: 13vh;
`;
const Appreciate = styled.p`
  color: whitesmoke;
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
