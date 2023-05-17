import React from "react";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <Wrapper>
      <StyledNavLink to="/admin/dashboard/schedule">Schedule</StyledNavLink>
      <StyledNavLink to="/admin/dashboard/services">Services</StyledNavLink>
      <StyledNavLink to="/admin/dashboard/data">Business Data</StyledNavLink>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 20px;
  background-color: #2c3e50;
  border-radius: 20px;
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
`;

const StyledNavLink = styled(NavLink)`
  margin-top: 20px;
  margin-bottom: 20px;
  text-decoration: none;
  color: #efefef;
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  &.active {
    text-decoration: underline;
    background-color: #efefef;
    color: #2c3e50;
  }
`;
export default NavBar;
