import { useState, useContext } from "react";
import { Wrapper, StyledInput, Submit } from "./Signup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Cookies from "js-cookie";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { setUserInfo } = useContext(UserContext);
  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData: formData }),
    })
      .then((res) => res.json())
      .then((response) => {
        setUserInfo(response.userInfo);
        Cookies.set("token", response.token, null);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };
  return (
    <Wrapper>
      <StyledStars>* * * * * * * * * * * * * * * * * * * *</StyledStars>
      <StyledStars>Enter your information below</StyledStars>
      <StyledForm onSubmit={(e) => handleLogin(e)}>
        <StyledInput
          type="text"
          name="entry"
          placeholder="Email or phone number"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <StyledInput
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <Submit type="submit">Login</Submit>
      </StyledForm>
      <div style={{ textAlign: "center" }}>
        <Message>Not signed up yet?</Message>
        <SignUpButton
          onClick={() => {
            navigate("/signUp");
          }}
        >
          sign up here
        </SignUpButton>
      </div>
      <StyledStars>* * * * * * * * * * * * * * * * * * * *</StyledStars>
    </Wrapper>
  );
};
const StyledForm = styled.form`
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
`;
export const StyledStars = styled.p`
  text-align: center;
  font-size: 1.3rem;
  color: whitesmoke;
`;
const SignUpButton = styled.button`
  font-family: sans-serif;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  font-size: 1.1rem;
  font-style: italic;
  color: #e7e7b0;
`;
const Message = styled.p`
  font-family: sans-serif;
  font-size: 1.1rem;
  color: whitesmoke;
  line-height: 2;
`;
export default Login;
