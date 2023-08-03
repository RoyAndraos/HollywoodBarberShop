import React from "react";
import { Title, Wrapper, TitleWrapper } from "./Menu";
import { styled } from "styled-components";
const About = () => {
  return (
    <Wrapper
      id="about-section"
      key={"about-section"}
      style={{ paddingBottom: "20px" }}
    >
      <TitleWrapper>
        <Title>About</Title>
      </TitleWrapper>
      <StoryContainer>
        <Story>
          Step through our doors and discover the magic of timeless style,
          impeccable service, and an unforgettable grooming experience. We can't
          wait to welcome you into our chair!
          <br />
          <br />
          Your satisfaction is our top priority. And we look forward to
          exceeding your expectations everytime you visit us.
          {/* the shop opened in 1957, and was run by the one and only Frederic
          Lereve. Amazed by the nice neighborhood and the even nicer people,
          Ralph Boujaoude and Alain Boujaoude {" (father and son)"} decided to
          start a family business and take over the shop in 2023. Their goal is
          to keep the legacy of the shop going, while adding their personal
          passionate touch to it. */}
        </Story>
        * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        <ImageContainer>
          <StyledImage
            src="/assets/chairFarBack.jpg"
            alt="shop image"
          ></StyledImage>
        </ImageContainer>
        * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      </StoryContainer>
      ***
    </Wrapper>
  );
};
const StoryContainer = styled.div`
  width: 96vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #035e3f;
  padding: 20px 0 20px 0;
  border-radius: 20px;
  height: 80vh;
  margin-bottom: 20px;
`;
const Story = styled.div`
  width: 72vw;
  text-align: center;
  line-height: 1.4;
  letter-spacing: 4px;
  margin: 2vh 0 2vh 0;
  font-family: "Brandon Grotesque Regular", sans-serif;
  text-shadow: 7px 7px 7px black;
`;
const StyledImage = styled.img`
  width: 80vw;
  border-radius: 20px;
`;
const ImageContainer = styled.div`
  background-color: transparent;
  width: 96vw;
  display: flex;
  justify-content: center;
  padding-bottom: 2vh;
  padding-top: 20px;
`;
export default About;
