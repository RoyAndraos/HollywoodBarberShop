import { useState, useEffect } from "react";
import styled from "styled-components";
import { StyledStars } from "./Login";
const Signup = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const validatePassword = (password) => {
    // At least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number, and minimum 8 characters
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    return passwordRegex.test(password);
  };
  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};

      // Validation rules
      if (!formData.fname) {
        newErrors.fname = "First Name is required";
      }
      if (!formData.lname) {
        newErrors.lname = "Last Name is required";
      }
      if (!(formData.email || formData.number)) {
        newErrors.email = "Email or Phone Number is required";
        newErrors.number = "Email or Phone Number is required";
      }
      if (!validatePassword(formData.password)) {
        newErrors.password =
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number, and be at least 8 characters long";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      // Check if there are no errors
      const isValidForm = Object.keys(newErrors).length === 0;

      setErrors(newErrors);
      setIsValid(isValidForm);
    };

    validateForm();
  }, [formData]);
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
        {errors.fname && <ErrorText>{errors.fname}</ErrorText>}
        <StyledInput
          type="text"
          name="lname"
          placeholder="Last Name"
          onChange={(e) => handleChange(e)}
        />
        {errors.lname && <ErrorText>{errors.lname}</ErrorText>}
        <StyledInput
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => handleChange(e)}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <StyledInput
          type="text"
          name="number"
          placeholder="Phone Number"
          onChange={(e) => handleChange(e)}
        />
        {errors.number && <ErrorText>{errors.number}</ErrorText>}
        <StyledInput
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <StyledInput
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        {errors.confirmPassword && (
          <ErrorText>{errors.confirmPassword}</ErrorText>
        )}
        <Submit type="submit" disabled={!isValid}>
          Sign Up
        </Submit>
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
`;
export const StyledInput = styled.input`
  padding: 0.5rem;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  border-bottom: 4px solid #035e3f;
  outline: none;
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
  &:disabled {
    background-color: rgba(255, 255, 255, 0.2);
    border-bottom: 4px solid #b50000;
    color: #b50000;
  }
`;
const ErrorText = styled.div`
  color: #b50000;
  font-family: sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  margin: 5px 30px 5px 30px;
`;
export default Signup;
