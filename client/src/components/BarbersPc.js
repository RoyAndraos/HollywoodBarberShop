import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { LanguageContext } from "./contexts/LanguageContext";
import Loader from "./float-fixed/Loader";
const BarbersPc = () => {
  const { language } = useContext(LanguageContext);
  const [currentBarberIndex, setCurrentBarberIndex] = useState(0);
  const [barbers, setBarbers] = useState(null);
  const [barberBackground, setBarberBackground] = useState(null);
  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getBarbers")
      .then((res) => res.json())
      .then((data) => {
        setBarbers(data.barbers);
        setBarberBackground(data.barbersBackgroundImage[0]);
      });
  }, []);

  // Function to handle next barber
  const nextBarber = () => {
    setCurrentBarberIndex(1);
  };

  // Function to handle previous barber
  const prevBarber = () => {
    setCurrentBarberIndex(0);
  };
  if (!barbers || !barberBackground) {
    return <Loader />;
  }
  return (
    <Wrapper id="barbers-section">
      <Title>{language === "en" ? "Our Team" : "Notre Equipe"}</Title>
      <BarberWrapper>
        {barbers.map((barber, index) => (
          <Barber key={barber._id} $selected={currentBarberIndex === index}>
            <Name>{barber.given_name + " " + barber.family_name}</Name>
            {barber.picture !== "" && (
              <ProfilePic src={barber.picture} alt={barber.name} />
            )}
            <Description>{barber.description}</Description>
          </Barber>
        ))}
      </BarberWrapper>
      <StyledBg src={barberBackground.src} alt="barber tools" />
      {barbers.length > 1 && (
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
  background-color: #011c13;
  width: 100%;
  height: 90vh;
  position: relative;
`;
const Title = styled.h1`
  color: rgba(243, 238, 211, 0.9);
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

const StyledBg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  position: absolute;
  clip-path: polygon(38% 16%, 48% 0, 100% 0, 100% 100%, 0 100%, 0% 60%, 0 20%);
  z-index: 1;
  top: 8vh;
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
