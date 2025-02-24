import { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import Loader from "../float-fixed/Loader";
import { BarberContext } from "../contexts/BarberContext";
import ralf from "../../assets/ralf.webp";
import ty from "../../assets/Ty.webp";
import jordi from "../../assets/jordi.jpg";
const Barbers = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { barberInfo } = useContext(BarberContext);

  if (!barberInfo) {
    return <Loader />;
  }
  return (
    <Wrapper
      id="barbers-section"
      key={"barbers-section"}
      className="snap-element"
    >
      {barberInfo.map((barber, index) => {
        return (
          <BarberWrapper key={barber._id}>
            <BarberTitle>
              {barber.given_name} {barber.family_name ? barber.family_name : ""}
            </BarberTitle>
            {barber.given_name === "Ty" && (
              <Avatar src={ty} alt="barber"></Avatar>
            )}
            {barber.given_name === "Ralph" && (
              <Avatar src={ralf} alt="barber"></Avatar>
            )}
            {barber.given_name === "Jordi" && (
              <Avatar src={jordi} alt="barber"></Avatar>
            )}

            <Description> {barber.description}</Description>
            <Book
              onClick={() => {
                navigate("/book");
              }}
            >
              {language === "en" ? "Book with" : "Reserver avec"}{" "}
              {barber.given_name}
            </Book>
          </BarberWrapper>
        );
      })}
    </Wrapper>
  );
};
const Book = styled.button`
  background-color: #006044;
  color: #eeebde;
  border: none;
  padding: 10px 20px;
  font-size: 1.1rem;
  margin-top: 20px;
  border-radius: 6px;
  box-shadow: -3px 5px 6px 0 rgb(0 0 0 / 15%);
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh;
`;
const BarberWrapper = styled.div`
  width: 85vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 96, 68, 0.3);
  padding-bottom: 3vh;
  margin-top: 5vh;
`;
const Avatar = styled.img`
  width: 85vw;
  border-radius: 5px;
  max-height: 50vh;
  object-fit: contain;
`;
const Description = styled.p`
  font-size: 1rem;
  line-height: 1.2;
  letter-spacing: 0.1rem;
  color: #006044;
  margin-top: 20px;
`;

const BarberTitle = styled.p`
  background-color: transparent;
  color: #006044;
  font-size: 1.5rem;
  padding: 7px 0;
  margin: 30px 0 30px 0;
`;

export default Barbers;
