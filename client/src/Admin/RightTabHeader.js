import AvailabilityComponent from "./AvailabilityComponent";
import DateManager from "./DateManager";
import styled from "styled-components";
const RightTabHeader = () => {
  return (
    <Wrapper>
      <DateManager />
      <AvailabilityComponent />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-top: 1px;
`;
export default RightTabHeader;
