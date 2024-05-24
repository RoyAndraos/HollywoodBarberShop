import React from "react";
import { GiRazor } from "react-icons/gi";
import styled, { keyframes } from "styled-components";
const Loader = () => {
  return (
    <Wrapper>
      <StyledRazor />
    </Wrapper>
  );
};
const spin = keyframes`
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
`;
const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: #eeebde;
`;
const StyledRazor = styled(GiRazor)`
  font-size: 5rem;
  color: #015639;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${spin} 1s linear infinite;
`;
export default Loader;
