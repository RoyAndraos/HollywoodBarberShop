import React from "react";
import RightTabHeader from "./RightTabHeader";
import { styled } from "styled-components";

const RightTab = () => {
  return (
    <Wrapper>
      <RightTabHeader />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-top: 1px;
`;
export default RightTab;
