import { styled } from "styled-components";

const HomePage = () => {
  return (
    <Container>
      <Heading>Hollywood </Heading>
      <OtherHeading>cuts</OtherHeading>
    </Container>
  );
};

const Container = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:100%;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
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

export default HomePage;
