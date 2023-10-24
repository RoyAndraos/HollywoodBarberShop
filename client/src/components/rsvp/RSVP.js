import GuestFormRsvp from "./GuestFormRsvp";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Booking from "./Booking";
import Header from "../Header";
const RSVP = () => {
  const { userInfo } = useContext(UserContext);
  return (
    <Wrapper>
      <Header isShowing={false} />
      {!userInfo ? <GuestFormRsvp /> : <Booking />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background-color: #011c13;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default RSVP;
