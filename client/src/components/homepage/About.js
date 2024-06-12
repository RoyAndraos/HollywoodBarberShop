import { useContext } from "react";
import { styled } from "styled-components";
import { LanguageContext } from "../contexts/LanguageContext";
import Loader from "../float-fixed/Loader";
import { TextContext } from "../contexts/TextContext";
const About = () => {
  const { language } = useContext(LanguageContext);
  const { text } = useContext(TextContext);
  const aboutText = text.filter((item) => item._id === "about");
  if (!text) {
    return <Loader />;
  }
  return (
    <Wrapper>
      <Title>
        {language === "en"
          ? "YOUR FAVORITE BARBERSHOP"
          : "VOS BARBIERS PRÉFÉRÉS"}
      </Title>
      <StoryContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Story>
            {language === "en"
              ? aboutText[0].content.split(".")[0]
              : aboutText[0].french.split(".")[0]}
            .
          </Story>
          <Story>
            {language === "en"
              ? aboutText[0].content.split(".")[1] +
                aboutText[0].content.split(".")[2]
              : aboutText[0].french.split(".")[1] +
                aboutText[0].french.split(".")[2]}
            .
          </Story>
        </div>
      </StoryContainer>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 10vh;
  margin-bottom: 15vh;
`;
const Title = styled.h1`
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 1px;
  color: #006044;
  text-align: left;
  margin-left: 7.5vw;
  margin-bottom: 3vh;
`;
const StoryContainer = styled.div`
  width: 85vw;
  left: 7.5vw;
  font-weight: 200;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: #006044;
`;
const Story = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  color: #006044;
  margin: 20px 0 0 0;
  &:last-of-type {
    margin-bottom: 40px;
  }
`;

export default About;
