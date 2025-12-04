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
import { PrivacyWrapper, Text, BackButton, SmallTitle } from "../FooterPc";

const FormRsvp = () => {
  const { setUserInfo } = useContext(UserContext);
  const { isMobile } = useContext(IsMobileContext);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isCanadianFormat, setIsCanadianFormat] = useState("");
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
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
    const cleanedValue = formData.number.replace(/\D/g, "");
    const isCanadian = selectedCountryCode === "+1";

    let phoneIsValid = false;
    let errorMsg = "";

    if (isCanadian) {
      phoneIsValid = cleanedValue.length === 10;
      if (!phoneIsValid)
        errorMsg = "Please enter a valid Canadian phone number";
    } else {
      // For non-Canadian numbers, we only validate length loosely
      phoneIsValid = cleanedValue.length > 5;
    }

    setIsPhoneValid(phoneIsValid);
    setFormData((prev) => ({
      ...prev,
      numberValid: phoneIsValid,
    }));
    setIsCanadianFormat(errorMsg);
  }, [formData.number, selectedCountryCode]);

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

  console.log(
    formData.fname.length === 0 ||
      formData.lname.length === 0 ||
      (selectedCountryCode === "+1" ? false : !isEmailValid) ||
      !formData.numberValid ||
      isCanadianFormat.length !== 0
  );

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
            {language === "en" ? (
              <>
                You are subscribing to Hollywood Barber Shop for transactional
                messages. At any time, reply STOP to opt out. Reply HELP for
                help. View our{" "}
                <TermsButton
                  onClick={() => {
                    setIsTermsOpen(true);
                  }}
                >
                  Terms and Conditions.
                </TermsButton>
                |
                <TermsButton
                  onClick={() => {
                    setIsPrivacyOpen(true);
                  }}
                >
                  View our Privacy Policy.
                </TermsButton>
              </>
            ) : (
              <>
                Vous vous abonnez à Hollywood Barber Shop pour des messages
                transactionnels. À tout moment, répondez STOP pour vous
                désabonner. Répondez AIDE pour obtenir de l'aide. Voir nos{" "}
                <TermsButton
                  onClick={() => {
                    setIsTermsOpen(true);
                  }}
                >
                  Termes et Conditions
                </TermsButton>
                .| Voir notre{" "}
                <TermsButton
                  onClick={() => {
                    setIsPrivacyOpen(true);
                  }}
                >
                  Politique de Confidentialité
                </TermsButton>
                .
              </>
            )}
          </Label>
        </div>
        <br />
        <CancelWrap $isMobile={isMobile}>
          {language === "en" ? (
            <>
              To <span style={{ color: "red" }}>cancel</span> an existing
              reservation,
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
            formData.fname.length === 0 ||
            formData.lname.length === 0 ||
            (selectedCountryCode === "+1" ? false : !isEmailValid) ||
            !formData.numberValid ||
            isCanadianFormat.length !== 0
          }
        >
          {language === "en" ? "Next Step" : "Prochaine Etape"}
          <FaArrowRight style={{ marginLeft: "10px", color: "whitesmoke" }} />
        </BookButton>
      </SmallWrapper>
      {isPrivacyOpen && (
        <PrivacyWrapper>
          <Text>
            <BackButton
              onClick={() => {
                setIsPrivacyOpen(false);
              }}
            >
              X
            </BackButton>
            <SmallTitle>Privacy Policy:</SmallTitle>
            <br />
            Hollywood Fairmount Barbershop is committed to protecting the
            privacy of our website visitors and clients. This Privacy Policy
            outlines how we collect, use, and protect your personal information
            when you visit our website or use our services.
            <SmallTitle> Information We Collect:</SmallTitle>
            <br />
            We collect personal information such as your full name, email
            address, and phone number when you make a booking appointment
            through our website. This information is used solely for the purpose
            of scheduling and contacting you regarding your appointment.
            <br />
            <SmallTitle>How We Use Your Information:</SmallTitle> <br /> We use
            the information you provide to schedule appointments and communicate
            with you regarding your bookings. We may also use your email address
            or phone number to send appointment reminders or notify you of any
            changes to your appointment.
            <br />
            <SmallTitle>Protection of Your Information:</SmallTitle>
            <br /> We take appropriate measures to safeguard your personal
            information against unauthorized access, alteration, disclosure, or
            destruction. We use industry-standard encryption and security
            protocols to protect your data. Sharing of Your Information: We do
            not sell, trade, or otherwise transfer your personal information to
            outside parties. Your information is only shared with our trusted
            partners or service providers who assist us in operating our website
            or conducting our business, and they are required to keep your
            information confidential. <br />
            <SmallTitle>Your Rights:</SmallTitle> <br />
            You have the right to access, update, or delete your personal
            information at any time. If you would like to do so, please contact
            us using the information provided below.
            <br />
            <SmallTitle>Cookies:</SmallTitle> <br />
            We may use cookies and similar tracking technologies to enhance your
            browsing experience on our website. You can set your browser to
            refuse cookies or alert you when cookies are being sent.
            <br />
            <SmallTitle>Changes to This Policy:</SmallTitle>
            <br /> We reserve the right to update or change this Privacy Policy
            at any time. Any changes will be effective immediately upon posting
            on this page. If you have any questions or concerns regarding our
            Privacy Policy, please contact us at hollywoodfairmount@gmail.com.
          </Text>
        </PrivacyWrapper>
      )}
      {isTermsOpen && (
        <PrivacyWrapper key={"TermsOfServices"}>
          <Text key={"TermsOfServ"}>
            <BackButton
              onClick={() => {
                setIsTermsOpen(false);
              }}
            >
              X
            </BackButton>
            <br />
            <br />
            <br />
            <br />
            Terms of Service These Terms of Service ("Terms") govern your use of
            www.hollywoodfairmount.com and the services provided by hollywood
            Fairmount Barbershop. By accessing or using our website or services,
            you agree to be bound by these Terms.
            <br />
            <SmallTitle>Booking Appointments:</SmallTitle>
            <br /> When booking appointments through our website, you agree to
            provide accurate and complete information, including your full name,
            email address, and phone number. <br />
            <SmallTitle>Cancellation and Rescheduling:</SmallTitle> If you need
            to cancel or reschedule your appointment, please contact us at least
            24h in advance.
            <br />
            <SmallTitle>Payment:</SmallTitle>
            <br /> Payment for services is due at the time of your appointment.
            We accept cash, credit/debit cards .<br />
            <SmallTitle>Use of Services:</SmallTitle>
            <br /> You agree to use our services only for lawful purposes and in
            compliance with these Terms. You may not use our services to harass,
            abuse, or harm others or to engage in any illegal activities.
            <br />
            <SmallTitle>Intellectual Property:</SmallTitle> <br />
            All content on our website, including text, images, logos, and
            graphics, is the property of Hollywood Fairmount Barbershop and is
            protected by copyright laws. You may not reproduce, distribute, or
            transmit any content without our prior written consent.
            <br />
            <SmallTitle>Limitation of Liability:</SmallTitle> <br />
            In no event shall Hollywood Fairmount Barbershop be liable for any
            damages arising out of or in connection with your use of our website
            or services, including but not limited to indirect, incidental,
            consequential, or punitive damages. <br />
            <br />
            If you have any questions or concerns regarding our Terms of
            Service, please contact us at hollywoodfairmount@gmail.com.
          </Text>
        </PrivacyWrapper>
      )}
    </StyledForm>
  );
};
const TermsButton = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: #006044;
  cursor: pointer;
`;
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
  font-size: 1rem;
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
