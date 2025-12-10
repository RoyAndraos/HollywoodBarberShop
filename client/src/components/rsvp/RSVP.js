import GuestFormRsvp from "./GuestFormRsvp";
import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Booking from "./Booking";
import Header from "../Header";
import { IsMobileContext } from "../contexts/IsMobileContext";
const RSVP = () => {
  const { userInfo } = useContext(UserContext);
  const { isMobile } = useContext(IsMobileContext);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  return (
    <Wrapper>
      {isMobile && <Header isShowing={false} />}
      {!userInfo ? (
        <GuestFormRsvp
          selectedCountryCode={selectedCountryCode}
          setSelectedCountryCode={setSelectedCountryCode}
        />
      ) : (
        <Booking selectedCountryCode={selectedCountryCode} />
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background-color: #eeebde;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export default RSVP;
