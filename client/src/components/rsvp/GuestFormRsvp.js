import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaArrowRight } from "react-icons/fa";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
import { useNavigate } from "react-router-dom";
import { BookButton } from "../Reviews";
import logoNotHome from "../../assets/onlyNameLogo.svg";
import { countryCodes } from "../helpers";
import Select from "react-select";
const FormRsvp = () => {
  const { setUserInfo } = useContext(UserContext);
  const { isMobile } = useContext(IsMobileContext);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isCanadianFormat, setIsCanadianFormat] = useState("");
  const navigate = useNavigate();
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    number: "",
    reservations: [],
    note: "",
    numberValid: false,
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { language } = useContext(LanguageContext);
  //Validate phone number
  useEffect(() => {
    const validatePhoneNumber = () => {
      // Remove all non-digit characters
      const cleanedValue = formData.number.replace(/\D/g, "");

      // Check if the cleaned value has the correct length
      const isCanadian = selectedCountryCode === "+1";
      const isValidLength = isCanadian
        ? cleanedValue.length === 10
        : cleanedValue.length === 10;

      if (isCanadian && !isValidLength) {
        setIsPhoneValid(false);
        setIsCanadianFormat("Please enter a valid Canadian phone number");
        setFormData((prev) => ({ ...prev, numberValid: false }));
      } else if (!isCanadian && !isValidLength) {
        setIsPhoneValid(false);
        setFormData((prev) => ({ ...prev, numberValid: false }));
      } else if (!isCanadian && isValidLength) {
        setIsPhoneValid(false);
      } else if (isCanadian && isValidLength) {
        setIsPhoneValid(true);
        setIsCanadianFormat("");
        setFormData((prev) => ({ ...prev, numberValid: true }));
      }
    };
    validatePhoneNumber();
  }, [formData.number, selectedCountryCode, isCanadianFormat, isPhoneValid]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      .css-bio7mv-option {
        background-color: #006044;
        color: whitesmoke;
        font-family: 'Source Code Pro', monospace;
        z-index: 1001;
        padding: 0.5rem ;
      }
      .css-bio7mv-option:hover {
        background-color: #004d36; /* Hover background color */
        color: #ffffff; /* Hover text color */
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet); // Clean up the style element on unmount
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      const cleanedValue = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));
      return;
    }

    if ((name === "fname" || name === "lname") && value.length === 1) {
      e.target.value = value.toUpperCase();
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <OverLay style={{ height: "100%", bottom: "-30%" }} />
          <StyledSelect
            unstyled
            options={countryCodes}
            $isMobile={isMobile}
            defaultValue={{ label: "Canada (+1)", value: "+1", iso: "CA" }}
            onChange={(e) => {
              setSelectedCountryCode(e.value);
            }}
          />
          <StyledInput
            $isMobile={isMobile}
            name="number"
            onChange={(e) => {
              handleChange(e);
            }}
            style={{ padding: "0" }}
            required
          ></StyledInput>
        </InputLabelWrap>
        {!isPhoneValid && (
          <Error>
            {selectedCountryCode === "+1"
              ? isCanadianFormat
              : language === "en"
              ? "If you don't have a Canadian number, an email address is required."
              : "Si vous n'avez pas de numéro canadien, une adresse courriel est requise."}
          </Error>
        )}
        <InputLabelWrap $isMobile={isMobile}>
          <StyledLabel>
            {language === "en" ? "Email" : "Courriel"}{" "}
            {selectedCountryCode !== "+1" && <Required>*</Required>}
          </StyledLabel>{" "}
          <OverLay />
          <StyledInput
            $isMobile={isMobile}
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          ></StyledInput>
        </InputLabelWrap>
        {!isEmailValid && selectedCountryCode !== "+1" && (
          <Error>
            {language === "en"
              ? "Please enter a valid email address."
              : "Veuillez entrer une adresse courriel valide."}
          </Error>
        )}

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
              ? "I agree to receive automated confirmation/reminder SMS/email to this mobile number/to this email address."
              : "Je consens à recevoir des messages de confirmation/rappel automatisés à ce numéro de téléphone/à cette adresse courriel."}
          </Label>
          <Required style={{ marginLeft: "10px" }}>*</Required>
        </div>
        <CancelWrap $isMobile={isMobile}>
          {language === "en" ? (
            <>
              To cancel an existing reservation,
              <CancelButton
                onClick={() => {
                  navigate("/cancelRes");
                }}
              >
                click here
              </CancelButton>
            </>
          ) : (
            <>
              Pour annuler une réservation existante,
              <CancelButton
                onClick={() => {
                  navigate("/cancelRes");
                }}
              >
                cliquez ici
              </CancelButton>
            </>
          )}
        </CancelWrap>
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
            formData.fname &&
            formData.lname &&
            (selectedCountryCode !== "+1" ? isEmailValid : true) &&
            formData.number
              ? false
              : true
          }
        >
          {language === "en" ? "Next Step" : "Prochaine Etape"}
          <FaArrowRight style={{ marginLeft: "10px", color: "whitesmoke" }} />
        </BookButton>
      </SmallWrapper>
    </StyledForm>
  );
};

const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  color: #006044;
  cursor: pointer;
  font-size: 1.2rem;
  text-decoration: underline;
  transition: 0.2s all ease-in-out;
  &:hover {
    color: white;
  }
`;

const CancelWrap = styled.div`
  width: 75%;
  color: #006044;
  text-align: center;
  z-index: 2;
  font-size: ${(props) => (props.$isMobile ? "1rem" : "1.2rem")};
`;

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

const StyledSelect = styled(Select)`
  width: 100%;
  z-index: 4;
  margin: 1rem 2rem 1rem 0;
  font-size: 1rem;
  color: #b50000;
  transition: 0.2s all ease-in-out;
  & div {
    cursor: pointer;
  }
  & svg {
    margin-right: ${(props) => (props.$isMobile ? "50vw" : "25vw")};
  }
`;

export const Error = styled.p`
  color: #b50000;
  font-size: 1rem;
  width: 75%;
  margin: 20px 0 0 0;
  text-align: center;
  background-color: #eeebde;
  z-index: 2;
  @media (max-width: 768px) {
    font-size: 1rem;
    width: 100%;
    padding: 1rem 0.5rem;
  }
`;

export default FormRsvp;
