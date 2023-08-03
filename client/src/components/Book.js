import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Book = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(validateForm());
  }, [email, phoneNumber]);
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
        setEmail(e.target.value);
        break;
      case "number":
        setPhoneNumber(e.target.value);
        break;
      default:
        break;
    }
    setFormValid(validateForm());
  };

  const validateForm = () => {
    const isEmailValid = validEmail(email);
    const isPhoneNumberValid = !isNaN(phoneNumber) && phoneNumber.length === 10;
    return isEmailValid | isPhoneNumberValid;
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
          <label>Email</label>
          <StyledInput
            type="text"
            name="email"
            autoComplete="email"
            key={"email"}
            value={email}
            onChange={(e) => {
              handleChange(e, "email");
            }}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <label>Phone Number</label>
          <StyledInput
            type="text"
            key={"number"}
            inputMode="numeric"
            value={phoneNumber}
            onChange={(e) => {
              handleChange(e, "number");
            }}
          />
        </LabelInputContainer>
      </InputsContainer>
      <ButtonContainer>
        <BookButton disabled={!formValid} onClick={(e) => handleSubmit(e)}>
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
const InputsContainer = styled.form`
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
  align-items: baseline;
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
