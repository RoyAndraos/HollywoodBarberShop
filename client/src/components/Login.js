import { useState } from "react";
import { Wrapper, StyledInput, Submit } from "./Signup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const navigate = useNavigate();
  return (
    <Wrapper>
      <StyledStars>* * * * * * * * * * * * * * * * * * * *</StyledStars>
      <StyledStars>Enter your information below</StyledStars>
      <StyledForm>
        <StyledInput
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <StyledInput
          type="password"
          name="pass"
          placeholder="Password"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <Submit type="submit">Login</Submit>
      </StyledForm>
      <div style={{ textAlign: "center" }}>
        <Message>If you don't have an account yet</Message>
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
`;
const SignUpButton = styled.button`
  font-family: sans-serif;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  font-size: 1.1rem;
  font-style: italic;
  color: whitesmoke;
`;
const Message = styled.p`
  font-family: sans-serif;
  font-size: 1.1rem;
  font-style: italic;
  color: whitesmoke;
`;
export default Login;
