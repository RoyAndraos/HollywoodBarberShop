import styled from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { StyledInput, Submit } from "../account/Signup";
import { FaArrowRight } from "react-icons/fa";
import { LanguageContext } from "../contexts/LanguageContext";
const FormRsvp = () => {
  const { setUserInfo } = useContext(UserContext);
  const [formData, setFormData] = useState({});
  const { language } = useContext(LanguageContext);
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
        <Advice>Enter either your email or your phone number</Advice>
        <Advice>This will be how we communicate with you</Advice>
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
