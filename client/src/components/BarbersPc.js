import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import bg from "../assets/barbersPC.jpg";
import { LanguageContext } from "./contexts/LanguageContext";
import { BarberContext } from "./contexts/BarberContext";
import { Blurhash } from "react-blurhash";

const BarbersPc = () => {
  const { language } = useContext(LanguageContext);
  const { barberInfo } = useContext(BarberContext);
  const [currentBarberIndex, setCurrentBarberIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = bg;
  }, []);

  // Function to handle next barber
  const nextBarber = () => {
    setCurrentBarberIndex(1);
  };

  // Function to handle previous barber
  const prevBarber = () => {
    setCurrentBarberIndex(0);
  };
  return (
    <Wrapper id="barbers-section">
      <Title>{language === "en" ? "Our Team" : "Notre Equipe"}</Title>
      <BarberWrapper>
        {barberInfo.map((barber, index) => (
          <Barber key={barber._id} $selected={currentBarberIndex === index}>
            <Name>{barber.given_name + " " + barber.family_name}</Name>
            {barber.picture !== "" && (
              <ProfilePic src={barber.picture} alt={barber.name} />
            )}
            <Description>{barber.description}</Description>
          </Barber>
        ))}
      </BarberWrapper>
      {imageLoaded && <StyledBg />}
      {imageLoaded && <Filter />}
      {!imageLoaded && (
        <div style={{ width: "100%", position: "absolute" }}>
          <Blurhash
            hash="LCEB,0Mc5S%f_NIAj]x]kqNFs:xu"
            width="99vw"
            height="70vh"
            resolutionX={32}
            resolutionY={32}
            punch={1}
            style={{
              clipPath:
                "polygon(38% 16%, 48% 0, 100% 0, 100% 100%, 0 100%, 0% 60%, 0 20%)",
            }}
          />
        </div>
      )}
      {barberInfo.length > 1 && (
        <ButtonWrap>
          <Button
            onClick={prevBarber}
            $selected={currentBarberIndex === 0}
          ></Button>
          <Button
            onClick={nextBarber}
            $selected={currentBarberIndex === 1}
          ></Button>
        </ButtonWrap>
      )}
    </Wrapper>
  );
};
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 3vw;
  position: absolute;
  left: 50%;
  top: 18vh;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 3;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.$selected ? "rgba(7, 144, 97, 0.5)" : "rgba(255, 255, 255, 0.3)"};
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 3;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 100%;
  height: 70vh;
  position: relative;
  top: -8vh;
`;
const Title = styled.h1`
  color: #079061;
  position: absolute;
  top: calc(5% + 8vh);
  left: 13%;
  margin: 0 2vw 5vh 2vw;
  font-size: 35px;
  z-index: 2;

  @media (max-width: 1000px) {
    font-size: 25px;
  }
`;

const StyledBg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${bg});
  background-size: cover;
  background-position: right 35% bottom 45%;
  z-index: 1;
  position: absolute;
  clip-path: polygon(38% 16%, 48% 0, 100% 0, 100% 100%, 0 100%, 0% 60%, 0 20%);
  z-index: 1;
  top: 8vh;
`;
const Filter = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(47, 36, 23, 0.9);
  clip-path: polygon(38% 16%, 48% 0, 100% 0, 100% 100%, 0 100%, 0% 60%, 0 20%);
  top: 8vh;
  z-index: 2;
`;

const BarberWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5vh;
  z-index: 3;
  position: relative;
  top: 12vh;
`;

const Barber = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${(props) =>
    props.$selected ? "translate(-50%, -50%)" : "translate(-200%, -50%)"};
  background-color: rgba(0, 0, 0, 0.8);
  width: 80vw;
  height: 50vh;
  border-radius: 10px;
  transition: 0.5s ease-in-out;
`;
const ProfilePic = styled.img`
  z-index: 3;
  width: 12vw;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 3px black;
`;
const Name = styled.h2`
  z-index: 3;
  color: whitesmoke;
  margin: 30px 0 20px;
  font-size: 30px;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;
const Description = styled.p`
  z-index: 3;
  color: #e7e7b0;
  padding: 3% 5%;
  font-size: 20px;
  text-align: center;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;
export default BarbersPc;
