import React, { useState } from "react";
import styled from "styled-components";

const Book = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [error, setError] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, phoneNumber };
    fetch("/addContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleChange = (e, name) => {
    e.preventDefault();
    switch (name) {
      case "email":
        // Set email
        setEmail(e.target.value);
        if (e.target.value.length === 0) {
          setEmailError("");
        } else {
          if (!validEmail(e.target.value)) {
            setEmailError("invalid email");
            setError(true);
          } else {
            setEmailError("");
            if (numberError === "") {
              setError(false);
            }
          }
        }
        break;
      case "number":
        // Set phone number
        setPhoneNumber(e.target.value);
        // Check number
        if (e.target.value.length === 0) {
          setNumberError("");
        } else {
          if (isNaN(e.target.value) || e.target.value.length !== 10) {
            setNumberError("invalid phone number");
            setError(true);
          } else {
            setNumberError("");
            if (emailError === "") {
              setError(false);
            }
          }
        }
        break;
      default:
        break;
    }
  };

  const validEmail = (email) => {
    if (!email.includes("@") || !email.includes(".")) {
      return false;
    }
    //get index for . and @ to make sure . comes after @
    const atIndex = email.indexOf("@");
    const lastDotIndex = email.lastIndexOf(".");
    if (lastDotIndex < atIndex) {
      return false;
    }
    return true;
  };

  return (
    <Wrapper>
      <StarsContainer>* * *</StarsContainer>
      <StarsContainer>
        * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      </StarsContainer>
      <InputsContainer>
        <LabelInputContainer>
          <label>Email:</label>
          <StyledInput
            type="text"
            key={"email"}
            onChange={(e) => {
              handleChange(e, "email");
            }}
          ></StyledInput>
        </LabelInputContainer>
        <LabelInputContainer>
          <label>Phone Number:</label>
          <StyledInput
            type="text"
            key={"number"}
            inputMode="numeric"
            value={phoneNumber}
            onChange={(e) => {
              handleChange(e, "number");
            }}
          ></StyledInput>
        </LabelInputContainer>
      </InputsContainer>
      <ButtonContainer>
        <BookButton disabled={error} onClick={(e) => handleSubmit(e)}>
          Submit
        </BookButton>
      </ButtonContainer>
      <StarsContainer>
        * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      </StarsContainer>
      <SorryContainer>
        <Sorry>
          This feature is not available yet! <br />
          Please enter your email address or phone number below and we will let
          you know when it is ready!
        </Sorry>
      </SorryContainer>
      <StarsContainer>
        * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      </StarsContainer>
      <StarsContainer>* * *</StarsContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #011c13;
  color: whitesmoke;
  height: 100vh;
`;
const Sorry = styled.p`
  font-size: 1.1rem;
  text-align: center;
  line-height: 1.5;
  letter-spacing: 2px;
`;
const SorryContainer = styled.div`
  width: 70vw;
  margin: 15vw;
`;
const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vh;
  justify-content: space-evenly;
  align-items: center;
`;
const LabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 10vh;
  font-size: 1.2rem;
`;
const BookButton = styled.button`
  font-size: 1.2rem;
  background-color: #035e3f;
  color: whitesmoke;
  border: none;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  margin: 20px 0 20px 0;
  &:disabled {
    opacity: 0.5;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StarsContainer = styled.div`
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 20px 20px;
  overflow: hidden;
  white-space: nowrap;
`;

const StyledInput = styled.input`
  font-size: 1.2rem;
  border-radius: 10px;
  border: none;
  padding: 5px 20px 5px 20px;
  &:focus {
    outline: none;
  }
`;

export default Book;
