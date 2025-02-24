import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import styled from "styled-components";
const MobileFooter = () => {
  const { language } = useContext(LanguageContext);
  return (
    <Wrapper>
      <div style={{ width: "100%" }}>
        <Title>
          {language === "en"
            ? "LOCATION & HOURS"
            : "ADRESSE & HEURES D'OUVERTURE"}
        </Title>
      </div>

      <TopList>
        <li>Hollywood Barbershop</li>
        <li>18 Av. Fairmount O, Montréal, QC H2T 2M1</li>
        <li>hollywoodfairmount@gmail.com</li>
        <li>+1 (514) 431-5793</li>
      </TopList>

      <BottomList>
        <li>
          {language === "en"
            ? "Sunday - Monday: closed"
            : "Dimanche - Lundi: fermé"}
        </li>
        <li>
          {" "}
          {language === "en"
            ? "Tuesday - Friday: 9am-7pm"
            : "Mardi - Vendredi: 9h-19h"}
        </li>
        <li>{language === "en" ? "Saturday: 9am-6pm" : "Samedi: 9h-18h"}</li>
      </BottomList>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px;
  background-color: #006044;
  color: #eeebde;
`;
const Title = styled.h1`
  font-size: 1.2rem;
  color: #eeebde;
  margin-bottom: 40px;
`;
const TopList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 30px;
`;
const BottomList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  gap: 10px;
`;
export default MobileFooter;
