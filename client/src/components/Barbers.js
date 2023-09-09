import { useContext } from "react";
import styled from "styled-components";
import { Title, Wrapper, TitleWrapper } from "./Menu";
import { useNavigate } from "react-router-dom";
import { BarberContext } from "./contexts/BarberContext";
const Barbers = () => {
  const { barberInfo } = useContext(BarberContext);
  const navigate = useNavigate();
  return (
    <Wrapper id="barbers-section" key={"barbers-section"}>
      <TitleWrapper>
        <Title>Barbers</Title>
      </TitleWrapper>
      {barberInfo.map((barber) => {
        return (
          <BarberWrapper key={barber._id}>
            * * * * * * * * * * * * * * * * * * * * * * * * * * * *
            <Frame key={barber.given_name}>
              <BarberTitle>
                {barber.given_name + " " + barber.family_name}
              </BarberTitle>
            </Frame>
            <ImageFrame key={barber.family_name}>
              <Avatar src="/assets/avatar.png" alt="avatar" />
            </ImageFrame>
            <Description> {barber.description}</Description>
            <Book key={barber._id} onClick={() => navigate("/book")}>
              Book
            </Book>
            * * * * * * * * * * * * * * * * * * * * * * * * * * * *<br />
          </BarberWrapper>
        );
      })}
    </Wrapper>
  );
};

const BarberWrapper = styled.div`
  display: flex;
  height: 45vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Avatar = styled.img`
  width: 100px;
  height: 100px;
`;
const Description = styled.p`
  font-size: 1.2rem;
  font-family: "Brandon Grotesque Regular";
  text-shadow: 7px 7px 7px black;
`;
const Book = styled.button`
  font-family: "arial", sans-serif;
  background-color: whitesmoke;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  padding: 7px 30px 7px 30px;
  transition: all 0.3s ease-in-out;
  border-bottom: 4px solid #035e3f;
  &:active {
    transform: scale(0.9);
  }
`;

const BarberTitle = styled.p`
  background-color: whitesmoke;
  color: #035e3f;
  font-size: 1.2rem;
  padding: 7px 12px 7px 12px;
  border-radius: 5px;
  border: 3px solid #035e3f;
  margin: 7px 7px 7px 7px;
`;

const Frame = styled.div`
  background-color: whitesmoke;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  border-bottom: 6px solid rgba(0, 0, 0, 0.9);
`;

const ImageFrame = styled.div`
  background-color: #035e3f;
  border-radius: 10px;
  width: 50%;
  text-align: center;
  padding: 10px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.8);
`;
export default Barbers;
