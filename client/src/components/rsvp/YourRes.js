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
        <Message>
          We have scheduled a reminder SMS containing the information below, if
          your reservation is today, you have already recieved the message.
        </Message>
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
        <Message>Thank you for booking with hollywood barbers!</Message>
      </SmallWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  color: whitesmoke;
  font-family: sans-serif;
  background-color: #eeebde;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  z-index: 3;
`;
const SmallWrapper = styled.div`
  color: #006044;
  font-family: sans-serif;
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
  color: #006044;
  font-weight: bold;
  font-style: italic;
`;
const Message = styled.p`
  width: 70%;
  text-align: left;
  margin-bottom: 40px;
  font-weight: 500;
  text-decoration: underline;
  &:last-of-type {
    margin-bottom: 0;
    margin-top: 40px;
    text-align: center;
  }
`;

export default YourRes;
