import React from "react";
import styled from "styled-components";

const Menu = () => {
  return (
    <Wrapper id="menu-section" key={"menu-section"}>
      <TitleWrapper>
        <Title>Menu</Title>
      </TitleWrapper>
      <StyledMenu src="/assets/menu.jpg" alt="Menu" />
      <ThanksWrapper>
        * <br />* <br />* <br />*<br /> * <br />* <br />* <br />* <br />*
        <Appreciate>
          payment with debit card or cash would be highly appreciated
        </Appreciate>
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
