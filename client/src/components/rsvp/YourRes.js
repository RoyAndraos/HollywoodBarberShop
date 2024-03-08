import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../float-fixed/Loader";
import styled from "styled-components";
import Header from "../Header";
const YourRes = () => {
  const [res, setRes] = useState({});
  const params = useParams();
  useEffect(() => {
    fetch(`/getRes/${params._id}`)
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
      <Header isShowing={false} />
      <Wrapper>
        <Message>
          We sent you an email/text containing the information below.
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
        <Message>Thank you for booking with hollywood barbers!</Message>
      </Wrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background-color: #002b1c;
  color: whitesmoke;
  font-family: sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
