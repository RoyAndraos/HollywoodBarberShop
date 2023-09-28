import GuestFormRsvp from "./GuestFormRsvp";
import styled from "styled-components";
import { StyledStars } from "../account/Login";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Booking from "./Booking";
import Header from "../Header";
const RSVP = () => {
  const { userInfo } = useContext(UserContext);
  return (
    <Wrapper>
      <Header isShowing={false} />
      <StyledStars style={{ marginTop: "30px" }}>* * *</StyledStars>
      {!userInfo ? <GuestFormRsvp /> : <Booking />}
      <StyledStars style={{ margin: "30px 0 30px 0" }}>* * *</StyledStars>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background-color: #011c13;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 500vh;
`;

export default RSVP;
