import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <p>The page you are looking for does not exist.</p>
      <br />
      <p>
        If you previously tried deleting a reservation, rest assured, it has
        been deleted!
      </p>
      <Button onClick={() => navigate("/")}>Go back to Home</Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  color: #006044;
  font-family: "Helvetica Neue", sans-serif;
  background-color: #eeebde;
  top: -5vh;
  position: relative;
  @media (max-width: 600px) {
    padding: 0 5vw;
    text-align: center;
  }
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #006044;
  cursor: pointer;
  font-family: "Helvetica Neue", sans-serif;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #006044;
    color: white;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    text-decoration: underline;
    padding: 10px 20px;
  }
`;
export default NotFound;
