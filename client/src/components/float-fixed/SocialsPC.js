import { ImLocation2 } from "react-icons/im";
import { SiInstagram } from "react-icons/si";
import { BsFacebook } from "react-icons/bs";
import { FaMobileAlt } from "react-icons/fa";
import styled from "styled-components";
const SocialsPC = ({ headerHeight }) => {
  const address =
    "Hollywood fairmount salon de barbier, 18 Av. Fairmount O, Montreal, Quebec H2T 2M1";
  const shopLocationURL = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}`;
  return (
    <Wrapper>
      <SocialMediaLink $headerHeight={headerHeight}>
        <a
          href="https://www.facebook.com/profile.php?id=100095015610230"
          style={{ all: "unset" }}
        >
          <BsFacebook />
        </a>
      </SocialMediaLink>
      <SocialMediaLink $headerHeight={headerHeight}>
        <a href={shopLocationURL} style={{ all: "unset" }}>
          <ImLocation2 />
        </a>
      </SocialMediaLink>
      <SocialMediaLink $headerHeight={headerHeight}>
        <a
          href="https://instagram.com/hollywood.barbers?igshid=MjEwN2IyYWYwYw=="
          style={{ all: "unset" }}
        >
          <SiInstagram />
        </a>
      </SocialMediaLink>

      <SocialMediaLink $headerHeight={headerHeight}>
        <a href="tel:+14389237297" style={{ all: "unset" }}>
          <FaMobileAlt />
        </a>
      </SocialMediaLink>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 100;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  padding-left: 1vw;
  height: 50%;
  gap: 0.5vw;
`;
const SocialMediaLink = styled.div`
  font-size: ${(props) => (props.$headerHeight === "4vh" ? "1.5rem" : "2rem")};
  color: whitesmoke;
  margin: 0 0.5rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    transform: scale(1.05);
    opacity: 1;
    color: #035e3f;
  }
  &:first-of-type {
    margin-left: 0;
  }
`;
export default SocialsPC;
