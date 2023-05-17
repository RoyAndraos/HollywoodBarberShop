import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Cookies from "js-cookie";

const Admin = () => {
  const navigate = useNavigate();
  const [keyValue, setkeyValue] = useState({
    username: "",
    password: "",
  });
  const [dISABLED, setDisabled] = useState(true);
  const handleChange = (e) => {
    if (e.target.name === "username") {
      setkeyValue({ ...keyValue, username: e.target.value });
      if (keyValue.username.length > 1) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else if (e.target.name === "password") {
      setkeyValue({ ...keyValue, password: e.target.value });
    }
  };

  const signIn = (e) => {
    e.preventDefault();
    if (keyValue.username.length === 0 || keyValue.password.length === 0) {
      window.alert("More information is needed");
    } else {
      fetch("/admin/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ info: keyValue }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            Cookies.set("token", result.token); // Set the token as a cookie
            navigate(`/admin/dashboard/${result.data}`);
          }
        });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Label>Username</Label>
        <Input
          type="text"
          onChange={(e) => {
            handleChange(e);
          }}
          name="username"
        ></Input>
      </Wrapper>
      <Wrapper>
        <Label>Password</Label>
        <Input
          type="password"
          onChange={(e) => {
            handleChange(e);
          }}
          name="password"
        ></Input>
      </Wrapper>
      <Wrapper>
        <SignInButton
          disabled={dISABLED}
          onClick={(e) => {
            signIn(e);
          }}
        >
          Sign In
        </SignInButton>
      </Wrapper>
    </Container>
  );
};

const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-3px);
  }
  40% {
    transform: translateX(3px);
  }
  60% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(3px);
  }
  100% {
    transform: translateX(0);
  }
`;

const Input = styled.input`
  height: 3vh;
  width: 20vw;
  border-radius: 10px;
  border: 3px solid #035e3f;
  font-size: 20px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
`;
const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Label = styled.label`
  margin-bottom: 10px;
  font-size: 30px;
`;

const SignInButton = styled.button`
  border: none;
  background-color: #035e3f;
  color: white;
  font-size: 30px;
  border-radius: 10px;
  width: 20vw;
  margin-top: 20px;
  padding: 10px 0 10px 0;
  transition: background-color 0.3s ease-in-out;

  &:not(:disabled)&:hover {
    cursor: pointer;
    padding: 6.8px 0 6.8px 0;
    animation: ${shakeAnimation} 0.5s;
    background-color: white;
    color: #035e3f;
    border: 3px solid #035e3f;
  }
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    opacity: 0.8;
  }
`;

export default Admin;
