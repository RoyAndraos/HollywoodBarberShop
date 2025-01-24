import React, { useState, useContext } from "react";
import styled from "styled-components";
import { BookButton } from "../Reviews";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
import { useNavigate } from "react-router-dom";
import logoNotHome from "../../assets/onlyNameLogo.svg";

const CancelReservation = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const { language } = useContext(LanguageContext);
  const { isMobile } = useContext(IsMobileContext);
  const navigate = useNavigate();
  const handleFetchReservation = () => {
    // Fetch reservations by phone number
    fetch(
      `https://hollywoodbarbershop.onrender.com/getResByPhone/${phoneNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          // Process the reservations: remove null and sort by date
          const cleanedReservations = data.data.reservations
            .filter((res) => res !== null) // Remove null elements
            .sort((b, a) => new Date(a.date) - new Date(b.date)); // Sort by date
          setReservations(cleanedReservations);
        } else {
          alert("Reservation not found");
        }
      });
  };
  const handleDeleteReservation = (params) => {
    fetch("https://hollywoodbarbershop.onrender.com/deleteReservation", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resId: params }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          alert(data.message);
        } else {
          navigate("/confirmCancel");
        }
      });
  };

  return (
    <>
      {isMobile && (
        <Logo
          src={logoNotHome}
          alt="hollywood barbershop logo"
          onClick={() => {
            navigate("/");
          }}
        />
      )}
      <StyledForm>
        {reservations.length === 0 && (
          <Wrapper>
            <h1>
              {language === "en"
                ? "Cancel Reservation"
                : "Annuler une réservation"}
            </h1>
            <label>
              {language === "en"
                ? "Enter your phone number"
                : "Entrez votre numéro de téléphone"}
            </label>
            <input
              type="tel"
              placeholder="5144304287"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <BookButton
              onClick={(e) => {
                e.preventDefault();
                handleFetchReservation();
              }}
            >
              {language === "en" ? "Search" : "Chercher"}
            </BookButton>
          </Wrapper>
        )}

        {reservations.length !== 0 && (
          <Wrapper>
            <h2>Reservation</h2>
            <p>
              <span>{language === "en" ? "Full name" : "Nom Complet"}</span>
              <span>
                {reservations[0].fname} {reservations[0].lname}
              </span>
            </p>
            <p>
              <span>{language === "en" ? "Barber" : "Barbier"}</span>{" "}
              <span>{reservations[0].barber}</span>
            </p>
            <p>
              <span>Date</span> <span>{reservations[0].date}</span>
            </p>
            <p>
              <span>{language === "en" ? "Time" : "Temps"}</span>
              <span>{reservations[0].slot[0].split("-")[1]}</span>
            </p>
            <p>
              <span>Service</span>
              <span>{reservations[0].service.name}</span>
            </p>

            <BookButton
              onClick={(e) => {
                e.preventDefault();
                handleDeleteReservation(reservations[0]._id);
              }}
            >
              {language === "en" ? "Cancel" : "Annuler"}
            </BookButton>
          </Wrapper>
        )}
      </StyledForm>
    </>
  );
};

const Logo = styled.img`
  position: relative;
  height: 15vh;
  top: 10vh;
  cursor: pointer;
  z-index: 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  top: 25vh;
  color: #006044;
  gap: 4vh;
  width: 70%;
  left: 15%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  font-size: 1.2rem;
  gap: 2vh;
  h1 {
    font-size: 2rem;
    font-weight: 600;
    @media (max-width: 1000px) {
      width: 100%;
      font-size: 1.5rem;
      text-align: center;
    }
  }
  input {
    width: 50%;
    height: 5vh;
    border-radius: 5px;
    border: none;
    padding: 0 1vw;
    font-size: 1.2rem;
    text-align: center;
    @media (max-width: 1000px) {
      font-size: 1rem;
    }
  }
  label {
    font-size: 1.2rem;
    text-align: left;
    @media (max-width: 1000px) {
      font-size: 1rem;
    }
  }
  p {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export default CancelReservation;
