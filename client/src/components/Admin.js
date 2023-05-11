import React from "react";
import { styled } from "styled-components";

const Admin = () => {
  return (
    <Container>
      <Wrapper>
        <Label>Username</Label>
        <input type="text"></input>
      </Wrapper>
      <Wrapper>
        <Label>Password</Label>
        <input type="password"></input>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 40vh;
`;
const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const Label = styled.label`
  margin-bottom: 10px;
`;

export default Admin;
