import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./float-fixed/Loader";
import styled from "styled-components";
import { LanguageContext } from "./contexts/LanguageContext";
import { IsMobileContext } from "./contexts/IsMobileContext";
import { BookButton } from "./Reviews";
import onlyNameLogo from "../assets/onlyNameLogo.svg";
const CancelRes = () => {
  const params = useParams()._id;
  const [reservation, setReservation] = useState([]);
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      `https://hollywoodbarbershop.onrender.com/getReservationForDelete/${params}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          navigate("/notfound");
          return;
        }
        setReservation(data.reservation);
      });
  }, [params, navigate]);
  const handleDeleteRes = () => {
    fetch("https://hollywoodbarbershop.onrender.com/deleteReservation", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resId: params }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "success") {
          navigate("*");
          return;
        } else {
          navigate("/confirmCancel");
        }
      });
  };
  if (reservation.length === 0) return <Loader />;
  return (
    <Wrapper>
      {isMobile && (
        <Logo
          src={onlyNameLogo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
      )}
      <h1>{language === "en" ? "Reservation Info" : "Réservation"}</h1>
      <InfoWrapper $isMobile={isMobile}>
        <LabelInfoWrap>
          <StyledLabel>{language === "en" ? "Name: " : "Nom: "}</StyledLabel>
          <p>
            {reservation.fname +
              " " +
              (reservation.lname.length !== 0 ? reservation.lname : "")}
          </p>
        </LabelInfoWrap>
        <LabelInfoWrap>
          <StyledLabel>
            {language === "en" ? "Phone Number: " : "Téléphone: "}
          </StyledLabel>
          <p>{reservation.number}</p>
        </LabelInfoWrap>
        <LabelInfoWrap>
          <StyledLabel>Date: </StyledLabel>
          <p>{reservation.date}</p>
        </LabelInfoWrap>
        <LabelInfoWrap>
          <StyledLabel>
            {language === "en" ? "Time: " : "Créneau: "}
          </StyledLabel>
          <p>{reservation.slot[0].split("-")[1]}</p>
        </LabelInfoWrap>
        <LabelInfoWrap>
          <StyledLabel>Service: </StyledLabel>
          <p>{reservation.service.name}</p>
        </LabelInfoWrap>
      </InfoWrapper>
      <BookButton
        onClick={() => {
          handleDeleteRes();
        }}
      >
        Cancel Reservation
      </BookButton>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100vh;
  color: #006044;
  font-family: "Helvetica Neue", sans-serif;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: ${(props) => (props.$isMobile ? "90%" : "30%")};
`;
const LabelInfoWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 1.2rem;
`;
const StyledLabel = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
`;
const Logo = styled.img`
  width: 20vh;
  position: absolute;
  top: 1rem;
`;

export default CancelRes;
