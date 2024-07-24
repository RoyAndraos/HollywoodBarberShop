import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaArrowRight } from "react-icons/fa";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
import { useNavigate } from "react-router-dom";
import { BookButton } from "../Reviews";
import logoNotHome from "../../assets/onlyNameLogo.svg";
const FormRsvp = () => {
  const { setUserInfo } = useContext(UserContext);
  const { isMobile } = useContext(IsMobileContext);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    number: "",
    reservations: [],
    note: "",
    numberValid: false,
  });
  const { language } = useContext(LanguageContext);
  //Validate phone number
  useEffect(() => {
    const validatePhoneNumber = () => {
      if (formData.number.length !== 10 && formData.number.length !== 0) {
        setIsPhoneValid(false);
        setFormData((prev) => ({ ...prev, numberValid: false }));
      } else {
        setIsPhoneValid(true);
        setFormData((prev) => ({ ...prev, numberValid: true }));
      }
    };

    validatePhoneNumber();
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
    if (e.target.name === "number") {
      const isValid =
        e.target.value.length === 10 || e.target.value.length === 0;
      setIsPhoneValid(isValid);
      setFormData((prev) => ({
        ...prev,
        numberValid: isValid,
      }));
    }
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
      {isMobile && (
        <Logo
          src={logoNotHome}
          alt="hollywood barbershop logo"
          onClick={() => {
            navigate("/");
          }}
        />
      )}
      <SmallWrapper $isMobile={isMobile}>
        <InputLabelWrap $isMobile={isMobile}>
          <StyledLabel>
            {language === "en" ? "First Name" : "Prénom"}
            <Required>*</Required>
          </StyledLabel>
          <OverLay />
          <StyledInput
            $isMobile={isMobile}
            name="fname"
            required
            onChange={(e) => {
              handleChange(e);
            }}
          ></StyledInput>
        </InputLabelWrap>
        <InputLabelWrap $isMobile={isMobile}>
          <StyledLabel>
            {language === "en" ? "Last Name" : "Nom De Famille"}
            <Required>*</Required>
          </StyledLabel>
          <OverLay />
          <StyledInput
            $isMobile={isMobile}
            name="lname"
            required
            onChange={(e) => {
              handleChange(e);
            }}
          ></StyledInput>
        </InputLabelWrap>
        <InputLabelWrap $isMobile={isMobile}>
          <StyledLabel>
            {language === "en" ? "Phone Number" : "Téléphone"}
            <Required>*</Required>
          </StyledLabel>
          <OverLay />
          <StyledInput
            $isMobile={isMobile}
            name="number"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          ></StyledInput>
        </InputLabelWrap>
        {!isPhoneValid && (
          <Error>
            {language === "en"
              ? "If you don't have a canadian number, you will not recieve any confirmation, reminder or cancelation messages."
              : "Si vous n'avez pas de numéro canadien, vous ne recevrez aucun message de confirmation, de rappel ou d'annulation."}
          </Error>
        )}
        <InputLabelWrap $isMobile={isMobile}>
          <StyledLabel>{language === "en" ? "Email" : "Courriel"}</StyledLabel>
          <OverLay />
          <StyledInput
            $isMobile={isMobile}
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

          <Label $isMobile={isMobile}>
            {language === "en"
              ? "I agree to receive automated confirmation SMS to this mobile number."
              : "Je consens à recevoir des SMS de confirmation automatisés à ce numéro de téléphone."}
          </Label>
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
            formData.fname && formData.lname && formData.number ? false : true
          }
        >
          {language === "en" ? "Next Step" : "Prochaine Etape"}
          <FaArrowRight style={{ marginLeft: "10px", color: "whitesmoke" }} />
        </BookButton>
      </SmallWrapper>
    </StyledForm>
  );
};
export const Required = styled.span`
  color: #b50000;
  font-size: 1.2rem;
`;
const Logo = styled.img`
  width: 35vw;
  margin: 5vh 0 3vh 0;
`;
const Label = styled.label`
  z-index: 2;
  font-size: ${(props) => (props.$isMobile ? "1rem" : "1.2rem")};
  margin-left: 10px;
`;
export const InputLabelWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 1.2rem;
  margin-top: 4vh;
  position: relative;
  width: ${(props) => (props.$isMobile ? "85vw" : "70%")};
  &:first-of-type {
    margin-top: 0;
  }
`;
export const StyledLabel = styled.label`
  color: #006044;
  position: relative;
  bottom: -8px;
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  top: 15vh;
  height: 70vh;
  @media (max-width: 768px) {
    height: 100vh;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    top: 0;
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
  padding: 1rem 0 0 0;
  border: none;
  border-bottom: 1px solid #006044;
  font-size: 1.2rem;
  outline: none;
  width: ${(props) => (props.$isMobile ? "85vw" : "92.5%")};
  background-color: transparent;
  color: #006044;
  text-align: center;
  z-index: 2;
  font-family: "Source Code Pro", "Courier New", Courier, "Lucida Console",
    monospace;
`;

export const Error = styled.p`
  color: #b50000;
  font-size: 1.2rem;
  width: 75%;
  margin: 20px 0 0 0;
  text-align: center;
  z-index: 2;
  @media (max-width: 768px) {
    font-size: 1rem;
    width: 85%;
  }
`;
export default FormRsvp;
