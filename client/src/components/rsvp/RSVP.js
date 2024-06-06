import GuestFormRsvp from "./GuestFormRsvp";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Booking from "./Booking";
import Header from "../Header";
import { IsMobileContext } from "../contexts/IsMobileContext";
const RSVP = () => {
  const { userInfo } = useContext(UserContext);
  const { isMobile } = useContext(IsMobileContext);
  return (
    <Wrapper>
      {isMobile && <Header isShowing={false} />}
      {!userInfo ? <GuestFormRsvp /> : <Booking />}
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
