import styled, { keyframes } from "styled-components";
import { useContext, useRef } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { TimelineLite } from "gsap";
const SubmitButton = ({
  isLoading,
  selectedService,
  selectedBarber,
  selectedSlot,
}) => {
  const { language } = useContext(LanguageContext);
  let buttonRef = useRef(null);
  const disabled =
    !selectedService ||
    !selectedBarber ||
    selectedSlot.length === 0 ||
    selectedSlot.length === 0;
  const handleGetOff = () => {
    const tl = new TimelineLite();
    if (disabled) return;
    tl.fromTo(
      buttonRef.current,
      { backgroundColor: "#fff", color: "#006044" },
      { backgroundColor: "#006044", color: "#fff", duration: 0.1 }
    );
  };
  const handleHover = () => {
    const tl = new TimelineLite();
    if (disabled) return;
    tl.fromTo(
      buttonRef.current,
      { backgroundColor: "#006044", color: "#fff" },
      { backgroundColor: "#fff", color: "#006044", duration: 0.1 }
    );
  };
  return (
    <StyledSubmit
      type="submit"
      disabled={disabled}
      onMouseEnter={() => handleHover()}
      onMouseLeave={() => {
        handleGetOff();
      }}
      ref={buttonRef}
    >
      {isLoading ? <Loader /> : language === "en" ? "Submit" : "Envoyer"}
    </StyledSubmit>
  );
};

const StyledSubmit = styled.button`
  width: 50%;
  padding: 10px;
  background-color: #006044;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s ease-in-out;
  font-family: "Helvetica Neue", sans-serif;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${rotate} 1s linear infinite;
`;

export default SubmitButton;
