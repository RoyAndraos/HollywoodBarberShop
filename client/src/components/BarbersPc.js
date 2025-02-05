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
import Loader from "./float-fixed/Loader";
import { BookButton } from "./Reviews";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "./contexts/LanguageContext";
import ralf from "../assets/ralf.webp";
import Ty from "../assets/Ty.webp";
const BarbersPc = () => {
  const { barberInfo } = useContext(BarberContext);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  let coverRef = useRef(null);
  let otherCoverRef = useRef(null);
  let coverRef2 = useRef(null);
  let otherCoverRef2 = useRef(null);
  useEffect(() => {
    const tl = new TimelineLite();
    if (coverRef && coverRef2) {
      tl.to(coverRef, { height: 0, duration: 0.8, delay: 1 })
        .to(coverRef2, {
          height: 0,
          duration: 0.8,
          delay: -0.8,
        })
        .to(otherCoverRef, { height: 0, duration: 0.8, delay: 1 })
        .to(otherCoverRef2, {
          height: 0,
          duration: 0.8,
          delay: -0.8,
        });
    }
  }, []);

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
  if (!barberInfo) {
    return (
      <Wrapper>
        <BarberWrapper style={{ height: "70vh" }}>
          <Loader />
        </BarberWrapper>
      </Wrapper>
    );
  }
  return (
    <Wrapper id="barbers-section">
      <BarberWrapper>
        {barberInfo.map((barber, index) => (
          <Barber key={barber._id} id="barber-wrapper">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "30px",
              }}
            >
              {barber.given_name === "Ralph" ? (
                <ProfilePic src={ralf} alt={barber.name} key={"owner"} />
              ) : (
                <ProfilePic src={Ty} alt={barber.name} key={"employee"} />
              )}
              {index === 0 && <Cover ref={(el) => (coverRef = el)} />}
              {index === 1 && <Cover ref={(el) => (otherCoverRef = el)} />}
            </div>

            <NameDescriptionWrap>
              <Name>
                {barber.given_name}
                {barber.family_name ? " " + barber.family_name : ""}
              </Name>
              <Description>
                "
                {language === "en"
                  ? barber.description
                  : barber.french_description}
                "
              </Description>
              {index === 0 && (
                <CoverText ref={(el) => (coverRef2 = el)} key={"textSide"} />
              )}
              {index === 1 && <Cover ref={(el) => (otherCoverRef2 = el)} />}
              <BookButton
                onClick={() => {
                  navigate("/notice");
                }}
              >
                {language === "en"
                  ? `Book With ${barber.given_name}`
                  : `Réserver avec ${barber.given_name}`}
              </BookButton>
            </NameDescriptionWrap>
          </Barber>
        ))}
      </BarberWrapper>
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
  position: absolute;
  bottom: 0;
  width: 100vw;
  font-family: "Helvetica Neue", sans-serif;
`;
const NameDescriptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #eeebde;
  width: 100%;
  position: relative;
  padding-bottom: 10vh;
  z-index: 1;
`;

const BarberWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  top: 10vh;
  padding-top: 10vh;
`;

const Barber = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  place-content: center;
  width: 80vw;
  height: 50vh;
  padding-bottom: 5vh;
  border-bottom: 1px solid #006044;
  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
    padding-top: 5vh;
  }
`;
const ProfilePic = styled.img`
  max-height: 45vh;
  width: 25vw;
  object-fit: cover;
`;
const Name = styled.h2`
  color: #006044;
  margin: 30px 0 20px;
  font-size: 30px;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;
const Description = styled.p`
  color: #006044;
  padding: 3% 0;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;
export default BarbersPc;
