import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import bg from "../assets/barbersPC.jpg";
import { LanguageContext } from "./contexts/LanguageContext";
import { BarberContext } from "./contexts/BarberContext";
import { Blurhash } from "react-blurhash";
const BarbersPc = () => {
  const { language } = useContext(LanguageContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { barberInfo } = useContext(BarberContext);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = bg;
  }, []);

  return (
    <Wrapper id="barbers-section">
      <Title>{language === "en" ? "Our Team" : "Notre Equipe"}</Title>
      <BarberWrapper>
        {barberInfo.map((barber) => (
          <Barber key={barber._id}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {barber.picture !== "" && (
                <ProfilePic src={barber.picture} alt={barber.name} />
              )}
              <Name>{barber.given_name + " " + barber.family_name}</Name>
            </div>
            <Description>{barber.description}</Description>
          </Barber>
        ))}
      </BarberWrapper>
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
      {imageLoaded && <StyledBg />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  width: 100%;
  height: 70vh;
  position: relative;
`;
const Title = styled.h1`
  color: #079061;
  position: absolute;
  top: 5%;
  left: 13%;
  margin: 0 2vw 5vh 2vw;
  font-size: clamp(1.8rem, 3rem, 3.4rem);
  z-index: 2;
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
`;
const Filter = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(47, 36, 23, 0.5);
  clip-path: polygon(38% 16%, 48% 0, 100% 0, 100% 100%, 0 100%, 0% 60%, 0 20%);
  z-index: 2;
`;

const BarberWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5vh;
  z-index: 3;
  position: relative;
`;

const Barber = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 2%;
`;
const ProfilePic = styled.img`
  z-index: 3;
  width: 20%;
  position: relative;
  left: 60%;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 3px black;
`;
const Name = styled.h2`
  z-index: 3;
  color: whitesmoke;
  font-size: clamp(1.8rem, 2.5rem, 3rem);
`;
const Description = styled.p`
  z-index: 3;
  color: #e7e7b0;
  padding: 3% 5%;
  font-size: clamp(1rem, 1.3rem, 2rem);
  text-align: center;
`;
export default BarbersPc;
