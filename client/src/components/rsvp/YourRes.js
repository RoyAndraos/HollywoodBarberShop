import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../float-fixed/Loader";
import styled from "styled-components";
import Header from "../Header";
import { IsMobileContext } from "../contexts/IsMobileContext";
const YourRes = () => {
  const [res, setRes] = useState({});
  const params = useParams();
  const { isMobile } = useContext(IsMobileContext);

  useEffect(() => {
    fetch(`https://hollywoodbarbershop.onrender.com/getRes/${params._id}`)
      .then((res) => res.json())
      .then((data) => {
        setRes(data.data);
      });
  }, [params]);
  const formatDate = (date) => {
    const options = { month: "long", weekday: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  if (Object.keys(res).length === 0) {
    return <Loader />;
  }
  return (
    <Wrapper>
      {isMobile && <Header isShowing={false} />}
      <SmallWrapper $isMobile={isMobile}>
        <Message>We sent you an SMS containing the information below.</Message>
        <StyledDiv>
          Barber <StyledInfo> {res.barber}</StyledInfo>
        </StyledDiv>
        <StyledDiv>
          Date <StyledInfo> {formatDate(new Date(res.date))}</StyledInfo>
        </StyledDiv>
        <StyledDiv>
          TimeSlot <StyledInfo> {res.slot[0].split("-")[1]}</StyledInfo>
        </StyledDiv>
        <StyledDiv>
          Service <StyledInfo> {res.service.name}</StyledInfo>
        </StyledDiv>
        <StyledDiv>
          Price <StyledInfo> {res.service.price}</StyledInfo>
        </StyledDiv>
        <StyledDiv>
          Phone <StyledInfo> {res.number}</StyledInfo>
        </StyledDiv>
        <StyledDiv>
          Reservation ID <StyledInfo> {res._id}</StyledInfo>
          <span>
            This id will help you cancel your reservation if ever needed.
          </span>
        </StyledDiv>
        <Message>Thank you for booking with hollywood barbers!</Message>
      </SmallWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  color: whitesmoke;
  font-family: sans-serif;
  background-color: ${({ $isMobile }) =>
    $isMobile ? "#011c13" : "rgba(0, 0, 0, 0.8)"};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  z-index: 3;
`;
const SmallWrapper = styled.div`
  color: whitesmoke;
  font-family: sans-serif;
  background-color: ${({ $isMobile }) =>
    $isMobile ? "#011c13" : "rgba(0, 0, 0, 0.8)"};
  height: ${({ $isMobile }) => ($isMobile ? "100vh" : "60vh")};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  z-index: 3;
`;
const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 70%;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 30px;
`;
const StyledInfo = styled.p`
  margin-left: 20px;
  color: #e7e797;
  font-style: italic;
`;
const Message = styled.p`
  width: 70%;
  text-align: center;
  line-height: 1.5;
`;

export default YourRes;
