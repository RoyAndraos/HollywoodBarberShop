import { useState } from "react";
import styled from "styled-components";
import { StyledStars } from "./Login";
const Signup = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <Wrapper>
      <StyledStars>* * * * * * * * * * * * * * * * * * * *</StyledStars>
      <StyledStars>Enter your information below</StyledStars>
      <StyledForm>
        <StyledInput
          type="text"
          name="fname"
          placeholder="First Name"
          onChange={(e) => handleChange(e)}
        />
        <StyledInput
          type="text"
          name="lname"
          placeholder="Last Name"
          onChange={(e) => handleChange(e)}
        />
        <StyledInput
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => handleChange(e)}
        />
        <StyledInput
          type="text"
          name="number"
          placeholder="Phone Number"
          onChange={(e) => handleChange(e)}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
        <StyledInput
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => handleChange(e)}
        />
        <Submit type="submit">Sign Up</Submit>
      </StyledForm>
      <StyledStars>* * * * * * * * * * * * * * * * * * * *</StyledStars>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  height: 100%;
  background-color: #011c13;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 70%;
  margin-top: 30px;
`;
export const StyledInput = styled.input`
  padding: 0.5rem;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  border-bottom: 4px solid #035e3f;
`;
export const Submit = styled.button`
  font-family: sans-serif;
  background-color: whitesmoke;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  padding: 7px 30px 7px 30px;
  transition: all 0.3s ease-in-out;
  border-bottom: 4px solid #035e3f;
  &:active {
    transform: scale(0.9);
  }
`;
export default Signup;
