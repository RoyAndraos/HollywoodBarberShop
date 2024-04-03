import styled from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaArrowRight } from "react-icons/fa";
import { LanguageContext } from "../contexts/LanguageContext";
import { IsMobileContext } from "../contexts/IsMobileContext";
import bg from "../../assets/bgPC.jpg";
const FormRsvp = () => {
  const { setUserInfo } = useContext(UserContext);
  const { isMobile } = useContext(IsMobileContext);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    number: "",
    reservations: [],
    note: "",
  });
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
      <SmallWrapper $isMobile={isMobile}>
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
        <StyledInput
          name="number"
          placeholder={
            language === "en" ? "Phone Number" : "Numero de Telephone"
          }
          onChange={(e) => {
            handleChange(e);
          }}
          required
        ></StyledInput>
        <StyledInput
          name="email"
          placeholder={
            language === "en"
              ? "Email (optional)"
              : "Addresse Courriel (optionnel)"
          }
          onChange={(e) => {
            handleChange(e);
          }}
        ></StyledInput>

        <div
          style={{
            width: "75%",
            color: "#e7e797",
            textAlign: "center",
            zIndex: "2",
          }}
        >
          <input
            type="checkbox"
            required
            style={{ position: "relative", left: "0" }}
          ></input>
          <label style={{ zIndex: "2" }}>
            {language === "en"
              ? "I agree to receive automated confirmation SMS to this mobile number."
              : "Je consens à recevoir des SMS de confirmation automatisés à ce numéro de téléphone."}
          </label>
        </div>

        <Submit
          type="submit"
          key={"next"}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          disabled={
            formData.fname && formData.lname && formData.number ? false : true
          }
        >
          {language === "en" ? "Next Step" : "Prochaine Etape"}
          <FaArrowRight style={{ marginLeft: "10px", color: "#035e3f" }} />
        </Submit>
      </SmallWrapper>
      {!isMobile && <StyledBg />}
      {!isMobile && <Filter />}
    </StyledForm>
  );
};
const StyledForm = styled.form`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 80vh;
  @media (min-width: 768px) {
    height: 100vh;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
`;

export const StyledBg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${bg});
  background-size: cover;
  background-position: right 35% bottom 45%;
  position: absolute;
  z-index: 0;
`;
export const Filter = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(47, 36, 23, 0.45);
  z-index: 0;
`;
export const SmallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: ${(props) => (props.$isMobile ? "100%" : "50%")};
  width: ${(props) => (props.$isMobile ? "100%" : "30%")};
  z-index: 2;
  background-color: ${(props) => (props.$isMobile ? "" : "rgba(0,0,0,0.7)")};
  border-radius: 10px;
`;

const Submit = styled.button`
  font-family: sans-serif;
  background-color: whitesmoke;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  padding: 7px 30px 7px 30px;
  transition: all 0.3s ease-in-out;
  border-bottom: 4px solid #035e3f;
  z-index: 2;
  &:active {
    transform: scale(0.9);
  }
  &:disabled {
    background-color: rgba(255, 255, 255, 0.2);
    border-bottom: 4px solid #b50000;
    color: #b50000;
  }
`;
const StyledInput = styled.input`
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  border-bottom: 4px solid #035e3f;
  outline: none;
  z-index: 2;
`;
export default FormRsvp;
