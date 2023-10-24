import styled from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { StyledInput, Submit } from "../account/Signup";
import { FaArrowRight } from "react-icons/fa";
import { LanguageContext } from "../contexts/LanguageContext";
import ReCAPTCHA from "react-google-recaptcha";
const FormRsvp = () => {
  const { setUserInfo } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    number: "",
    reservations: [],
    note: "",
  });
  const { language } = useContext(LanguageContext);
  const handleChangeCaptcha = (e) => {};
  const handleChange = (e) => {
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
      <StyledInput
        name="fname"
        placeholder={language === "en" ? "First Name" : "Prenom"}
        onChange={(e) => {
          handleChange(e);
        }}
      ></StyledInput>
      <StyledInput
        name="lname"
        placeholder={language === "en" ? "Last Name" : "Nom de Famille"}
        onChange={(e) => {
          handleChange(e);
        }}
      ></StyledInput>
      <AdviceWrap>
        <Advice>
          {language === "en"
            ? "Enter either your email or your phone number"
            : "Entrez soit votre adresse courriel, soit votre numéro de téléphone"}
        </Advice>
      </AdviceWrap>
      <StyledInput
        name="email"
        placeholder={language === "en" ? "Email" : "Addresse Courriel"}
        onChange={(e) => {
          handleChange(e);
        }}
        disabled={formData.number ? true : false}
      ></StyledInput>
      <StyledInput
        name="number"
        placeholder={language === "en" ? "Phone Number" : "Numero de Telephone"}
        onChange={(e) => {
          handleChange(e);
        }}
        disabled={formData.email ? true : false}
      ></StyledInput>
      <div style={{ width: "75%", color: "#e7e797", textAlign: "center" }}>
        <input
          type="checkbox"
          style={{ position: "relative", left: "0" }}
        ></input>
        <label>
          {language === "en"
            ? "I agree to receive automated confirmation and reminder messages/email to this number/email. Contact us to opt out."
            : "J'accepte de recevoir des messages/e-mails automatiques de confirmation et de rappel à ce numéro/e-mail. Contactez-nous pour vous désinscrire."}
        </label>
      </div>

      <ReCAPTCHA
        sitekey="6LdBM3MoAAAAABznpzpyxD_Nxku-ynPSDiV3u-bH"
        onChange={handleChangeCaptcha}
      />

      <Submit
        type="submit"
        key={"next"}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        disabled={
          formData.fname &&
          formData.lname &&
          (formData.email || formData.number)
            ? false
            : true
        }
      >
        {language === "en" ? "Next Step" : "Prochaine Etape"}
        <FaArrowRight style={{ marginLeft: "10px", color: "#035e3f" }} />
      </Submit>
    </StyledForm>
  );
};
const StyledForm = styled.form`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 66vh;
`;
const Advice = styled.span`
  color: #e7e797;
`;
const AdviceWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
`;
export default FormRsvp;
