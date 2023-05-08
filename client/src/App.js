import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
const App = () => {
  return (
    <Container>
      <GlobalStyles />
      <Heading>Hollywood Barber Shop</Heading>
      <OtherHeading>Hollywood Barber Shop</OtherHeading>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const Heading = styled.div`
  font-size: 24px;

  @media screen and (min-width: 768px) {
    font-size: 36px;
  }
`;

const OtherHeading = styled.h1`
  font-size: 24px;
  @media screen and (min-width: 768px) {
    padding: 12px;
    font-size: 36px;
  }
`;
export default App;
