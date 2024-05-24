import { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BarberContext } from "./contexts/BarberContext";
import {
  SmallTitle,
  Text,
  StyledButton,
  BottomPart,
  PrivacyWrapper,
  BackButton,
} from "./FooterPc";
import { TimelineLite } from "gsap";
const BarbersPc = () => {
  const [currentBarberIndex, setCurrentBarberIndex] = useState(0);
  const { barberInfo } = useContext(BarberContext);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  let coverRef = useRef(null);
  let coverRef2 = useRef(null);
  useEffect(() => {
    const tl = new TimelineLite();
    if (imageLoaded) {
      tl.to(coverRef, { height: 0, duration: 0.8, delay: 1 }).to(coverRef2, {
        height: 0,
        duration: 0.8,
        delay: -0.8,
      });
    }
  }, [imageLoaded]);
  const handlePrivacy = () => {
    if (isTermsOpen) {
      setIsTermsOpen(false);
    }
    setIsPrivacyOpen(!isPrivacyOpen);
  };
  const handleTerms = () => {
    if (isPrivacyOpen) {
      setIsPrivacyOpen(false);
    }
    setIsTermsOpen(!isTermsOpen);
  };
  // Function to handle next barber
  const nextBarber = () => {
    setCurrentBarberIndex(1);
  };

  // Function to handle previous barber
  const prevBarber = () => {
    setCurrentBarberIndex(0);
  };
  return (
    <Wrapper id="barbers-section">
      <BarberWrapper>
        {barberInfo.map((barber, index) => (
          <Barber key={barber._id} $selected={currentBarberIndex === index}>
            {barber.picture !== "" && (
              <div
                style={{ position: "relative", height: "100%", width: "100%" }}
              >
                <ProfilePic
                  src={barber.picture}
                  alt={barber.name}
                  onLoad={() => setImageLoaded(true)}
                />
                <Cover ref={(el) => (coverRef = el)} />
              </div>
            )}
            <NameDescriptionWrap>
              <Name>{barber.given_name + " " + barber.family_name}</Name>
              <Description>{barber.description}</Description>
              <CoverText ref={(el) => (coverRef2 = el)} key={"textSide"} />
            </NameDescriptionWrap>
          </Barber>
        ))}
      </BarberWrapper>
      {barberInfo.length > 1 && (
        <ButtonWrap>
          <Button
            onClick={prevBarber}
            $selected={currentBarberIndex === 0}
          ></Button>
          <Button
            onClick={nextBarber}
            $selected={currentBarberIndex === 1}
          ></Button>
        </ButtonWrap>
      )}
      <Footer>
        <BottomPart style={{ backgroundColor: "#eeebde" }}>
          <span></span>
          <StyledButton
            onClick={() => {
              handlePrivacy();
            }}
            key={"Privacy"}
          >
            Privacy Policy
          </StyledButton>
          <span>|</span>
          <StyledButton
            onClick={() => {
              handleTerms();
            }}
            key={"Terms"}
          >
            Terms of Service
          </StyledButton>
          <span>|</span>
          <StyledButton>
            Copyright Hollywood Fairmount Barbershop ©{" "}
            {new Date().getFullYear()}
          </StyledButton>
        </BottomPart>
        {isPrivacyOpen && (
          <PrivacyWrapper>
            <Text>
              <BackButton
                onClick={() => {
                  setIsPrivacyOpen(false);
                }}
              >
                X
              </BackButton>
              <SmallTitle>Privacy Policy:</SmallTitle>
              <br />
              Hollywood Fairmount Barbershop is committed to protecting the
              privacy of our website visitors and clients. This Privacy Policy
              outlines how we collect, use, and protect your personal
              information when you visit our website or use our services.
              <SmallTitle> Information We Collect:</SmallTitle>
              <br />
              We collect personal information such as your full name, email
              address, and phone number when you make a booking appointment
              through our website. This information is used solely for the
              purpose of scheduling and contacting you regarding your
              appointment.
              <br />
              <SmallTitle>How We Use Your Information:</SmallTitle> <br /> We
              use the information you provide to schedule appointments and
              communicate with you regarding your bookings. We may also use your
              email address or phone number to send appointment reminders or
              notify you of any changes to your appointment.
              <br />
              <SmallTitle>Protection of Your Information:</SmallTitle>
              <br /> We take appropriate measures to safeguard your personal
              information against unauthorized access, alteration, disclosure,
              or destruction. We use industry-standard encryption and security
              protocols to protect your data. Sharing of Your Information: We do
              not sell, trade, or otherwise transfer your personal information
              to outside parties. Your information is only shared with our
              trusted partners or service providers who assist us in operating
              our website or conducting our business, and they are required to
              keep your information confidential. <br />
              <SmallTitle>Your Rights:</SmallTitle> <br />
              You have the right to access, update, or delete your personal
              information at any time. If you would like to do so, please
              contact us using the information provided below.
              <br />
              <SmallTitle>Cookies:</SmallTitle> <br />
              We may use cookies and similar tracking technologies to enhance
              your browsing experience on our website. You can set your browser
              to refuse cookies or alert you when cookies are being sent.
              <br />
              <SmallTitle>Changes to This Policy:</SmallTitle>
              <br /> We reserve the right to update or change this Privacy
              Policy at any time. Any changes will be effective immediately upon
              posting on this page. If you have any questions or concerns
              regarding our Privacy Policy, please contact us at
              hollywoodfairmount@gmail.com.
            </Text>
          </PrivacyWrapper>
        )}
        {isTermsOpen && (
          <PrivacyWrapper key={"TermsOfServices"}>
            <Text key={"TermsOfServ"}>
              <BackButton
                onClick={() => {
                  setIsTermsOpen(false);
                }}
              >
                X
              </BackButton>
              <br />
              <br />
              <br />
              <br />
              Terms of Service These Terms of Service ("Terms") govern your use
              of www.hollywoodfairmount.com and the services provided by
              hollywood Fairmount Barbershop. By accessing or using our website
              or services, you agree to be bound by these Terms.
              <br />
              <SmallTitle>Booking Appointments:</SmallTitle>
              <br /> When booking appointments through our website, you agree to
              provide accurate and complete information, including your full
              name, email address, and phone number. <br />
              <SmallTitle>Cancellation and Rescheduling:</SmallTitle> If you
              need to cancel or reschedule your appointment, please contact us
              at least 24h in advance.
              <br />
              <SmallTitle>Payment:</SmallTitle>
              <br /> Payment for services is due at the time of your
              appointment. We accept cash, credit/debit cards .<br />
              <SmallTitle>Use of Services:</SmallTitle>
              <br /> You agree to use our services only for lawful purposes and
              in compliance with these Terms. You may not use our services to
              harass, abuse, or harm others or to engage in any illegal
              activities.
              <br />
              <SmallTitle>Intellectual Property:</SmallTitle> <br />
              All content on our website, including text, images, logos, and
              graphics, is the property of Hollywood Fairmount Barbershop and is
              protected by copyright laws. You may not reproduce, distribute, or
              transmit any content without our prior written consent.
              <br />
              <SmallTitle>Limitation of Liability:</SmallTitle> <br />
              In no event shall Hollywood Fairmount Barbershop be liable for any
              damages arising out of or in connection with your use of our
              website or services, including but not limited to indirect,
              incidental, consequential, or punitive damages. <br />
              <br />
              If you have any questions or concerns regarding our Terms of
              Service, please contact us at hollywoodfairmount@gmail.com.
            </Text>
          </PrivacyWrapper>
        )}
      </Footer>
    </Wrapper>
  );
};

const Cover = styled.div`
  position: absolute;
  left: -1%;
  top: 0;
  width: 101%;
  height: 100%;
  background-color: #eeebde;
  z-index: 10;
`;
const CoverText = styled.div`
  position: absolute;
  bottom: 0;
  width: 60%;
  height: 100%;
  background-color: #eeebde;
  z-index: 10;
`;
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  font-family: "Helvetica Neue", sans-serif;
`;
const NameDescriptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 3vw;
  position: absolute;
  left: 50%;
  top: 18vh;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 3;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.$selected ? "rgba(7, 144, 97, 0.5)" : "rgba(255, 255, 255, 0.3)"};
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 3;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eeebde;
  width: 100%;
  height: 92vh;
  position: relative;
  top: 8vh;
`;

const BarberWrapper = styled.div`
  z-index: 3;
  position: relative;
`;

const Barber = styled.div`
  z-index: 1000;
  display: grid;
  grid-template-columns: 40% 60%;
  width: 80vw;
  height: 50vh;
  border-radius: 10px;
`;
const ProfilePic = styled.img`
  z-index: 3;
  width: 100%;
  border-radius: 10px;
`;
const Name = styled.h2`
  z-index: 3;
  color: #006044;
  margin: 30px 0 20px;
  font-size: 30px;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;
const Description = styled.p`
  z-index: 3;
  color: #006044;
  padding: 3% 5%;
  font-size: 20px;
  text-align: center;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;
export default BarbersPc;
