import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Title, Wrapper, TitleWrapper } from "./Menu";
const Barbers = () => {
  const [barberInfo, setBarberInfo] = useState([]);
  useEffect(() => {
    fetch("/getBarberInfo")
      .then((res) => res.json())
      .then((data) => setBarberInfo(data.data));
  }, []);

  !barberInfo.length && <div>Loading...</div>;

  return (
    <Wrapper id="barbers-section" key={"barbers-section"}>
      <TitleWrapper>
        <Title>Barbers:</Title>
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
            <Book>Book Now!</Book>* * * * * * * * * * * * * * * * * * * * * * *
            * * * * *
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
`;
const Book = styled.button`
  font-family: "arial", sans-serif;
  background-color: whitesmoke;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  padding: 7px 12px 7px 12px;
  transition: all 0.3s ease-in-out;
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
`;

const ImageFrame = styled.div`
  background-color: #035e3f;
  border-radius: 10px;
  width: 50%;
  text-align: center;
  padding: 10px;
`;
export default Barbers;
