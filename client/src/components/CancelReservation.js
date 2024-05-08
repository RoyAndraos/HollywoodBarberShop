import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { IsMobileContext } from "./contexts/IsMobileContext";
import { useNavigate } from "react-router-dom";
import { Error } from "./rsvp/GuestFormRsvp";
import { LanguageContext } from "./contexts/LanguageContext";
import Header from "./Header";
import { ImageContext } from "./contexts/ImageContext";

const CancelReservation = () => {
  const { isMobile } = useContext(IsMobileContext);
  const [phone, setPhone] = useState("");
  const [resId, setResId] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [resIdError, setResIdError] = useState("");
  const [cancelError, setCancelError] = useState("");
  const { language } = useContext(LanguageContext);
  const { images } = useContext(ImageContext);
  const homepageBackground = images.filter(
    (image) => image.filename === "homepageBackground"
  )[0].src;
  //make a validation function to check if the phone number is valid and if the reservation id is valid
  useEffect(() => {
    if (phone.length !== 10 && phone.length !== 0) {
      setPhoneError("Invalid phone number");
    } else if (phone.length === 0) {
      setPhoneError("empty");
    } else {
      setPhoneError("");
    }

    if (resId.length !== 36 && resId.length !== 0) {
      setResIdError("Invalid reservation id");
    } else if (resId.length === 0) {
      setResIdError("empty");
    } else {
      setResIdError("");
    }
  }, [phone, resId]);

  //eliminate spaces from the id (when copy paste)
  useEffect(() => {
    setResId(resId.replace(/\s/g, ""));
  }, [resId]);
  const navigate = useNavigate();
  const handleDeleteReservation = () => {
    fetch("https://hollywoodbarbershop.onrender.com/deleteReservation", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone, resId: resId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          if (data.message === "Reservation is in the past.") {
            if (language === "en") {
              setCancelError("Reservation already happened.");
            } else {
              setCancelError("La réservation a déjà eu lieu.");
            }
          } else if (data.message === "Reservation is in less than 3 hours.") {
            if (language === "en") {
              setCancelError(
                "Reservation is in less than 3 hours. Please call to cancel."
              );
            } else {
              setCancelError(
                "La réservation est dans moins de 3 heures. Veuillez appeler pour annuler."
              );
            }
          } else {
            navigate(`/confirmedCancel`);
          }
        } else {
          language === "en"
            ? setCancelError("Reservation not found. Please try again.")
            : setCancelError("Réservation introuvable. Veuillez réessayer.");
        }
      });
  };
  return (
    <Wrapper>
      {isMobile && (
        <HeaderWrapper>
          <Header isShowing={false} />
        </HeaderWrapper>
      )}
      <SmallWrapper>
        <Instructions>
          {language === "en"
            ? "To cancel your reservation, please enter your phone number and thereservation id. find the reservation id in the confirmation SMS recieved when booking."
            : "Pour annuler votre réservation, veuillez entrer votre numéro de téléphone et l'identifiant de réservation. Trouvez l'identifiant de réservation dans le SMS de confirmation reçu lors de la réservation."}
        </Instructions>
        <InputWrapper>
          <Label>{language === "en" ? "Phone Number" : "Telephone"}</Label>
          <StyledInput
            type="text"
            placeholder="5145555555"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          ></StyledInput>
          {phoneError === "Invalid phone number" && (
            <Error>
              {language === "en" ? phoneError : "Numero de telephone invalide"}
            </Error>
          )}
          <Label>{"Reservation id"}</Label>
          <StyledInput
            type="text"
            placeholder="Reservation id"
            onChange={(e) => {
              setResId(e.target.value);
            }}
          ></StyledInput>
          {resIdError === "Invalid reservation id" && (
            <Error>
              {language === "en" ? resIdError : "Identifiant invalide"}
            </Error>
          )}
        </InputWrapper>
        {cancelError.length !== 0 && <Error>{cancelError}</Error>}
        <CancelButton
          onClick={() => {
            handleDeleteReservation();
          }}
          disabled={phoneError.length !== 0 || resIdError.length !== 0}
        >
          {language === "en" ? "Cancel Reservation" : "Annuler la réservation"}
        </CancelButton>
      </SmallWrapper>
      {!isMobile && <StyledBg key={"cancel"} src={homepageBackground} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  top: 8vh;
  height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #011c13;
  @media (max-width: 768px) {
    top: 0;
    height: 100vh;
  }
`;
const Instructions = styled.div`
  color: whitesmoke;
  font-size: 1.2rem;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const Label = styled.label`
  font-size: 1.2rem;
  color: #e7e797;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
  width: 80%;
`;
const SmallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 50px;
  height: 50vh;
  width: 40vw;
  color: whitesmoke;
  position: absolute;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 98vw;
    height: 60vh;
    background-color: transparent;
  }
`;
const StyledInput = styled.input`
  width: 70%;
  height: 30px;
  margin: 10px;
  border-radius: 5px;
  border: none;
  padding: 10px;
  font-size: 1.2rem;
  outline: none;
  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
  }
`;
const CancelButton = styled.button`
  font-family: sans-serif;
  background-color: whitesmoke;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  padding: 7px 30px 7px 30px;
  transition: all 0.3s ease-in-out;
  border-bottom: 4px solid #b50000;
  z-index: 2;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
  &:disabled {
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const HeaderWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 10;
  background-color: black;
`;
const StyledBg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: 0;
`;
export default CancelReservation;
