import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaArrowRight } from "react-icons/fa";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
import { NavLink } from "react-router-dom";
import { BookButton } from "../Reviews";
const FormRsvp = () => {
  const { setUserInfo } = useContext(UserContext);
  const { isMobile } = useContext(IsMobileContext);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    number: "",
    reservations: [],
    note: "",
  });
  const { language } = useContext(LanguageContext);

  // check if phone number is valid
  useEffect(() => {
    if (formData.number.length !== 10 && formData.number.length !== 0) {
      setIsPhoneValid(false);
    } else {
      setIsPhoneValid(true);
    }
  }, [formData.number]);

  const handleChange = (e) => {
    if (
      (e.target.name === "fname" || e.target.name === "lname") &&
      e.target.value.length === 1
    ) {
      e.target.value = e.target.value.toUpperCase();
    }
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInfo(formData);
  };
  return (
    <StyledForm
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <SmallWrapper $isMobile={isMobile}>
        <InputLabelWrap>
          <StyledLabel>
            {language === "en" ? "First Name" : "Prénom"}
            <Required>*</Required>
          </StyledLabel>
          <OverLay />
          <StyledInput
            name="fname"
            onChange={(e) => {
              handleChange(e);
            }}
          ></StyledInput>
        </InputLabelWrap>
        <InputLabelWrap>
          <StyledLabel>
            {language === "en" ? "Last Name" : "Nom De Famille"}
            <Required>*</Required>
          </StyledLabel>
          <OverLay />
          <StyledInput
            name="lname"
            onChange={(e) => {
              handleChange(e);
            }}
          ></StyledInput>
        </InputLabelWrap>
        <InputLabelWrap>
          <StyledLabel>
            {language === "en" ? "Phone Number" : "Téléphone"}
            <Required>*</Required>
          </StyledLabel>
          <OverLay />
          <StyledInput
            name="number"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          ></StyledInput>
        </InputLabelWrap>
        {!isPhoneValid && (
          <Error>
            {language === "en" ? "Invalid phone number" : "Numero invalide"}
          </Error>
        )}
        <InputLabelWrap>
          <StyledLabel>Email</StyledLabel>
          <OverLay />
          <StyledInput
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          ></StyledInput>
        </InputLabelWrap>
        <div
          style={{
            width: "75%",
            color: "#006044",
            textAlign: "center",
            zIndex: "2",
          }}
        >
          <input
            type="checkbox"
            required
            style={{
              position: "relative",
              left: "0",
              margin: "2vh 0",
              cursor: "pointer",
            }}
          ></input>

          <label
            style={{ zIndex: "2", fontSize: "1.2rem", marginLeft: "10px" }}
          >
            {language === "en"
              ? "I agree to receive automated confirmation SMS to this mobile number."
              : "Je consens à recevoir des SMS de confirmation automatisés à ce numéro de téléphone."}
          </label>
          <Required style={{ marginLeft: "10px" }}>*</Required>
        </div>

        <BookButton
          type="submit"
          key={"next"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.3rem",
          }}
          disabled={
            isPhoneValid && formData.fname && formData.lname && formData.number
              ? false
              : true
          }
        >
          {language === "en" ? "Next Step" : "Prochaine Etape"}
          <FaArrowRight style={{ marginLeft: "10px", color: "whitesmoke" }} />
        </BookButton>
        <CancelWrapper>
          {language === "en" ? "Or" : "Ou"}{" "}
          <StyledNavLink to="/cancelReservation">
            {language === "en" ? "click here" : "cliquez ici"}
          </StyledNavLink>{" "}
          {language === "en"
            ? "to cancel an existing reservation."
            : "pour annuler une réservation existante."}
        </CancelWrapper>
      </SmallWrapper>
    </StyledForm>
  );
};
export const Required = styled.span`
  color: #b50000;
  font-size: 1.2rem;
`;

export const InputLabelWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 1.2rem;
  gap: 1vh;
  margin-top: 2vh;
  position: relative;
  width: 65%;
  &:first-of-type {
    margin-top: 0;
  }
`;
export const StyledLabel = styled.label`
  color: #006044;
  margin-bottom: 1rem;
`;
const CancelWrapper = styled.div`
  color: #006044;
  font-size: 1.1rem;
`;
const StyledNavLink = styled(NavLink)`
  color: black;
  transition: all 0.3s ease-in-out;
  font-size: 1.2rem;
  margin: 0 0.5rem;
  &:hover {
    color: #035e3f;
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  top: 3vh;
  height: 70vh;
  @media (min-width: 768px) {
    height: 100vh;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
`;
export const OverLay = styled.div`
  background-color: #006044;
  opacity: 0.2;
  position: absolute;
  width: 105%;
  height: 60%;
  bottom: -15%;
  z-index: 1;
  left: -2.5%;
`;
export const SmallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: ${(props) => (props.$isMobile ? "100%" : "70%")};
  width: ${(props) => (props.$isMobile ? "100%" : "60%")};
  z-index: 2;
`;

export const StyledInput = styled.input`
  padding: 1rem 2rem 0 1rem;
  border: none;
  border-bottom: 1px solid #006044;
  font-size: 1.2rem;
  outline: none;
  width: 92.5%;
  background-color: transparent;
  color: #006044;
  text-align: center;
  z-index: 2;
`;

export const Error = styled.p`
  color: #b50000;
  font-size: 1.2rem;
  z-index: 2;
`;
export default FormRsvp;
