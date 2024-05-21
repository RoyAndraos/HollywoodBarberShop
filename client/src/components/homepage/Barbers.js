import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Title, Wrapper, TitleWrapper } from "./Menu";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
const Barbers = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const [currentBarberIndex, setCurrentBarberIndex] = useState(0);
  const [barbers, setBarbers] = useState(null);
  useEffect(() => {
    fetch("https://hollywoodbarbershop.onrender.com/getAbout")
      .then((res) => res.json())
      .then((data) => {
        setBarbers(data.barbers[0]);
      });
  }, []);
  const nextBarber = () => {
    setCurrentBarberIndex((prevIndex) =>
      prevIndex === barbers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevBarber = () => {
    setCurrentBarberIndex((prevIndex) =>
      prevIndex === 0 ? barbers.length - 1 : prevIndex - 1
    );
  };

  return (
    <Wrapper
      id="barbers-section"
      key={"barbers-section"}
      className="snap-element"
      $isMobile={isMobile}
    >
      <TitleWrapper>
        <Title>{language === "en" ? "Our Team" : "Notre Equipe"}</Title>
      </TitleWrapper>
      {barbers.map((barber, index) => {
        return (
          <BarberWrapper
            key={barber._id}
            $selected={currentBarberIndex === index}
            $prev={currentBarberIndex === index - 1}
          >
            {barber.picture !== "" && (
              <Avatar src={barber.picture} alt="barber"></Avatar>
            )}
            <NameWrapper>
              <BarberTitle>
                {barber.given_name + " " + barber.family_name}
              </BarberTitle>
            </NameWrapper>
            <Description> {barber.description}</Description>
          </BarberWrapper>
        );
      })}
      <ButtonWrapper>
        <SelectWrap>
          <StyledSelectButton
            onClick={prevBarber}
            $selected={currentBarberIndex === 0}
          ></StyledSelectButton>
          <StyledSelectButton
            onClick={nextBarber}
            $selected={currentBarberIndex === 1}
          ></StyledSelectButton>
        </SelectWrap>
        <Book onClick={() => navigate("/book")}>
          {language === "en" ? "Book" : "Reserver"}
        </Book>
      </ButtonWrapper>
    </Wrapper>
  );
};
const NameWrapper = styled.div`
  width: 70vw;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  position: absolute;
  align-items: center;
  bottom: 20%;
`;
const SelectWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 20vw;
  justify-content: space-between;
`;
const StyledSelectButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => (props.$selected ? "#035e3f" : "#02412b")};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;
const BarberWrapper = styled.div`
  display: flex;
  height: 45vh;
  width: 70vw;
  font-size: 1.2rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: #035e3f;
  padding-bottom: 20px;
  border-bottom: 1px solid #035e3f;
  border-top: 1px solid #035e3f;
  top: 40%;
  left: 50%;
  position: absolute;
  transition: all 0.3s ease-in-out;
  transform: ${({ $selected }) =>
    $selected ? "translate(-50%, -50%)" : "translate(-200%, -50%)"};
  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
`;
const Avatar = styled.img`
  width: 120px;
  border-radius: 10%;
`;
const Description = styled.p`
  font-size: 1rem;
  font-family: "poppins", sans-serif;
  line-height: 1.2;
  letter-spacing: 0.1rem;
  color: whitesmoke;
  margin-top: 10px;
`;
const Book = styled.button`
  font-family: "arial", sans-serif;
  background-color: #035e3f;
  border-radius: 10px;
  color: whitesmoke;
  border: none;
  font-size: 1.2rem;
  padding: 7px 30px 7px 30px;
  width: 45%;
  transition: all 0.3s ease-in-out;
  margin: 30px 0 20px 0;
  &:active {
    transform: scale(0.9);
  }
`;

const BarberTitle = styled.p`
  background-color: transparent;
  color: #e7e7b0;
  font-size: 1.5rem;
  padding: 7px 0;
  margin-top: 20px;
  font-family: "Brandon Grotesque Regular";
`;

export default Barbers;
