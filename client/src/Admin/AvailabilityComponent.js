import styled from "styled-components";
import React, { useState } from "react";
import SchedulePicker from "./SchedulePicker";
const AvailabilityComponent = () => {
  const [open, setOpen] = useState(false);
  const handleAvailabilityToggle = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  return (
    <Wrapper>
      <AvailabilityToggle onClick={(e) => handleAvailabilityToggle(e)}>
        Availability
      </AvailabilityToggle>
      {open && <SchedulePicker />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  border: 1px solid black;
  align-items: flex-end;
`;

const AvailabilityToggle = styled.button`
  border: none;
  background-color: #2c3e50;
  color: #efefef;
  font-family: "Brandon Grotesque black", sans-serif;
  font-size: 18px;
  border-radius: 5px;
  padding: 5px 15px 5px 15px;
  width: 150px;
  height: 38px;
  &:hover {
    cursor: pointer;
    background-color: #1a252f;
  }
  &:active {
    transform: scale(0.98);
  }
`;
export default AvailabilityComponent;
