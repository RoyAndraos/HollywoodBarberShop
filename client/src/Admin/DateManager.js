import React, { useState } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RiCalendar2Fill } from "react-icons/ri";

const DateManager = ({ availableDates }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleOpenRSVP = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const filterUnavailableDates = (date) => {
    const formattedDate = formatDate(date);
    return !availableDates.includes(formattedDate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  return (
    <Wrapper>
      <AddRSVP onClick={(e) => handleOpenRSVP(e)}>Add Reservation</AddRSVP>
      {open && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          filterDate={filterUnavailableDates}
          customInput={
            <CustomInputWrapper>
              <CustomInputField>
                {selectedDate ? formatDate(selectedDate) : "Select a date"}
              </CustomInputField>
              <IconWrapper>
                <RiCalendar2Fill />
              </IconWrapper>
            </CustomInputWrapper>
          }
        />
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  border: 1px solid black;
`;
const AddRSVP = styled.button`
  border: none;
  background-color: #2c3e50;
  color: #efefef;
  font-family: "Brandon Grotesque black", sans-serif;
  font-size: 18px;
  border-radius: 5px;
  padding: 5px 15px 5px 15px;
  height: 38px;
  &:hover {
    cursor: pointer;
    background-color: #1a252f;
  }
  &:active {
    transform: scale(0.98);
  }
`;
const CustomInputWrapper = styled.div`
  display: flex;
  font-family: "Brandon Grotesque black", sans-serif;
  justify-content: space-evenly;
  margin-top: 25px;
  border: 2px solid #2c3e50;
  color: #2c3e50;
  padding: 5px 15px 5px 15px;
  width: 150px;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const CustomInputField = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  // Styles for the icon wrapper
`;

export default DateManager;
